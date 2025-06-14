import { Audio } from 'expo-av';
import { create } from 'zustand';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

// audioState aqui 
interface AudioState {
  isMuted: boolean;
  setIsMuted: (state: boolean) => void;
}
export const useAudioState = create<AudioState>((set) => ({
  isMuted: false,
  setIsMuted: (state: boolean) => set({ isMuted: state }),
})); 

export const AudioAssets = {
  TEMA_PRINCIPAL: require('../assets/songs/Tema_Principal.mp3'),
} as const;
let currentSound: Audio.Sound | null = null;
let currentSoundAsset: keyof typeof AudioAssets | null = null;
let currentPlaylistIndex = 0;
let isChangingTrack = false;
let isInitialized = false;
let appState: AppStateStatus = 'active';
let shouldResumeOnForeground = false;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Lista de todas as músicas para tocar em sequência
const playlist: (keyof typeof AudioAssets)[] = [
  'TEMA_PRINCIPAL',
];
export const useAudio = () => {
  const { isMuted, setIsMuted } = useAudioState();
  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          interruptionModeIOS: 1,
          interruptionModeAndroid: 1,
        });
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log('App state changed from', appState, 'to', nextAppState);
      
      if (appState === 'active' && (nextAppState === 'background' || nextAppState === 'inactive')) {
        if (currentSound) {
          try {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
              shouldResumeOnForeground = true;
              await currentSound.pauseAsync();
              console.log('Música pausada - app foi para background/inactive');
            }
          } catch (error) {
            console.error('Erro ao pausar música:', error);
          }
        }
      } else if ((appState === 'background' || appState === 'inactive') && nextAppState === 'active') {
        if (shouldResumeOnForeground && currentSound) {
          try {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded && !status.isPlaying) {
              await currentSound.playAsync();
              console.log('Música retomada - app voltou para active');
            }
          } catch (error) {
            console.error('Erro ao retomar música:', error);
          }
          shouldResumeOnForeground = false;
        }
      }
      appState = nextAppState;
    };
    initAudio();
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription?.remove();
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);
  const playNextInPlaylist = async () => {
    if (isChangingTrack) {
      console.log('Já está trocando de música, ignorando chamada...');
      return;
    }
    try {
      isChangingTrack = true;
      const nextSong = playlist[currentPlaylistIndex];
      if (currentPlaylistIndex >= playlist.length - 1) {
        console.log('Fim da playlist, voltando ao início...');
        currentPlaylistIndex = 0;
      } else {
        currentPlaylistIndex++;
      }
      await playSound(nextSong);
      if (!currentSound) {
        await playNextInPlaylist();
      }
    } catch (error) {
      console.error('Erro ao tocar próxima música:', error);
      // Em caso de erro, tenta a próxima música após um delay
      setTimeout(() => playNextInPlaylist(), RETRY_DELAY);
    } finally {
      isChangingTrack = false;
    }
  };
  const playSound = async (soundAsset: keyof typeof AudioAssets, retryCount = 0) => {
    if (isChangingTrack && retryCount === 0) {
      console.log('Já está trocando de música, ignorando nova requisição...');
      return Promise.resolve();
    }
    if (currentSoundAsset === soundAsset && currentSound && retryCount === 0) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          console.log(`${soundAsset} já está tocando e funcionando, ignorando...`);
          return Promise.resolve();
        }
      } catch (error) {
        console.log(`Erro ao verificar ${soundAsset}, prosseguindo com recriação...`);
      }
    }
    try {
      isChangingTrack = true;
      // Primeiro, garante que qualquer som anterior seja completamente parado
      await stopSound();      // Pequeno delay para garantir que o som anterior foi limpo
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log(`Tentando tocar: ${soundAsset}`);      const { sound } = await Audio.Sound.createAsync(AudioAssets[soundAsset], {
        isLooping: true,
        volume: isMuted ? 0 : 1,
        progressUpdateIntervalMillis: 1000,
        shouldPlay: true,
      });
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        console.log(`Loop habilitado para ${soundAsset}:`, status.isLooping);
      }
      // Se outro som foi iniciado enquanto este estava carregando, descarta este
      if (currentSound && currentSound !== sound) {
        await sound.unloadAsync();
        return;
      }
      currentSound = sound;
      currentSoundAsset = soundAsset;      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          if (!status.isPlaying && !isMuted && !status.didJustFinish && !isChangingTrack) {
            console.log('Som parou de tocar, tentando reiniciar...');
            try {
              await sound.playAsync();
            } catch (error) {
              console.error('Erro ao tentar reiniciar o som:', error);
            }
          }
        } else {
          console.log('Som não está carregado - aguardando nova chamada manual');
        }
      });
      // Verifica se o som carregou corretamente antes de tocar
      const initialStatus = await sound.getStatusAsync();
      if (!initialStatus.isLoaded) {
        throw new Error('Som não carregou corretamente');
      }
      await sound.playAsync();
      console.log(`Tocando: ${soundAsset}`);
    } catch (error) {
      console.error(`Erro ao tocar som ${soundAsset}:`, error);
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          playSound(soundAsset, retryCount + 1);
        }, RETRY_DELAY);
      } else {
        console.log(`Falhou após ${MAX_RETRIES} tentativas, tentando próxima música...`);
        await playNextInPlaylist();
      }
    } finally {
      isChangingTrack = false;
    }
  };  const pauseSound = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await currentSound.pauseAsync();
          console.log('Música pausada manualmente');
        }
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  };
  const resumeSound = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && !status.isPlaying) {
          await currentSound.playAsync();
          console.log('Música retomada manualmente');
        }
      }
    } catch (error) {
      console.error('Error resuming sound:', error);
    }
  };
  const stopSound = async () => {
    try {
      isChangingTrack = true;
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }
        currentSound = null;
        currentSoundAsset = null;
      }
      console.log('Som parado e limpo com sucesso');
    } catch (error) {
      console.error('Error stopping sound:', error);
      currentSound = null;
      currentSoundAsset = null;
    } finally {
      setTimeout(() => {
        isChangingTrack = false;
      }, 200);
    }
  };  const playMainTheme = async () => {
    if (currentSoundAsset === 'TEMA_PRINCIPAL' && currentSound) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          console.log('Tema principal já está tocando, ignorando chamada...');
          return Promise.resolve();
        }
      } catch (error) {
        console.log('Erro ao verificar status, reiniciando tema principal...');
        currentSound = null;
        currentSoundAsset = null;
      }
    }
    if (isChangingTrack) {
      console.log('Sistema ocupado, aguardando para iniciar tema principal...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isChangingTrack) {
        return playMainTheme();
      } else {
        console.log('Sistema ainda ocupado, cancelando chamada...');
        return Promise.resolve();
      }
    }
    currentPlaylistIndex = 0;
    console.log('Iniciando tema principal...');
    return playSound('TEMA_PRINCIPAL');
  };
  const playNextTrack = async () => {
    if (currentPlaylistIndex >= playlist.length - 1) {
      currentPlaylistIndex = 0;
    } else {
      currentPlaylistIndex++;
    }
    const nextSong = playlist[currentPlaylistIndex];
    console.log(`Avançando manualmente para: ${nextSong}`);
    return playSound(nextSong);
  };
  const toggleMute = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {          await currentSound.setVolumeAsync(isMuted ? 1 : 0);
          if (!isMuted && !status.isPlaying && !isChangingTrack) {
            await playNextInPlaylist();
          }
        }
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };  return {
    playSound,
    stopSound,
    pauseSound,
    resumeSound,
    playMainTheme,
    playNextTrack,
    toggleMute,
    isMuted,
    playNextInPlaylist,
  };
};