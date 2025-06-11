import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { useAudioState } from '../hooks/useAudioState';

// Array com todas as músicas disponíveis
export const AudioAssets = {
  TEMA_PRINCIPAL: require('../assets/songs/Tema_Principal.mp3'),
  ID_95: require('../assets/songs/ID_95.mp3'),
  ID_94: require('../assets/songs/ID_94.mp3'),
  ID_92: require('../assets/songs/ID_92.mp3'),
  ID_91: require('../assets/songs/ID_91.mp3'),
  ID_4_A_6: require('../assets/songs/ID_4_a_6.mp3'),
  ID_3: require('../assets/songs/ID_3.mp3'),
  ID_2: require('../assets/songs/ID_2.mp3'),
  ID_1: require('../assets/songs/ID_1.mp3'),
  ID_0: require('../assets/songs/ID_0.mp3'),
  FINAL_BOM: require('../assets/songs/Final_Bom.mp3'),
} as const;

let currentSound: Audio.Sound | null = null;
let currentSoundAsset: keyof typeof AudioAssets | null = null;
let currentPlaylistIndex = 0;
let isChangingTrack = false; // Trava para evitar múltiplas trocas simultâneas
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

// Lista de todas as músicas para tocar em sequência
const playlist: (keyof typeof AudioAssets)[] = [
  'TEMA_PRINCIPAL',
  'ID_0',
  'ID_1',
  'ID_2',
  'ID_3',
  'ID_4_A_6',
  'ID_91',
  'ID_92',
  'ID_94',
  'ID_95',
  'FINAL_BOM'
];

export const useAudio = () => {
  const { isMuted, setIsMuted } = useAudioState();

  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          interruptionModeIOS: 1, // Audio.InterruptionModeIOS.DoNotMix
          interruptionModeAndroid: 1, // Audio.InterruptionModeAndroid.DoNotMix
        });
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    
    initAudio();

    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const playNextInPlaylist = async () => {
    // Se já estiver trocando de música, não faz nada
    if (isChangingTrack) {
      console.log('Já está trocando de música, ignorando chamada...');
      return;
    }

    try {
      isChangingTrack = true;
      const nextSong = playlist[currentPlaylistIndex];
      currentPlaylistIndex = (currentPlaylistIndex + 1) % playlist.length;
      await playSound(nextSong);
    } finally {
      isChangingTrack = false;
    }
  };

  const playSound = async (soundAsset: keyof typeof AudioAssets, retryCount = 0) => {
    // Se já estiver trocando de música, não faz nada
    if (isChangingTrack && retryCount === 0) {
      console.log('Já está trocando de música, ignorando nova requisição...');
      return;
    }

    try {
      isChangingTrack = true;

      // Primeiro, garante que qualquer som anterior seja completamente parado
      await stopSound();

      // Pequeno delay para garantir que o som anterior foi limpo
      await new Promise(resolve => setTimeout(resolve, 100));

      const { sound } = await Audio.Sound.createAsync(AudioAssets[soundAsset], {
        isLooping: false, // Mudamos para false para permitir a troca de músicas
        volume: isMuted ? 0 : 1,
        progressUpdateIntervalMillis: 1000,
        shouldPlay: true,
      });

      // Se outro som foi iniciado enquanto este estava carregando, descarta este
      if (currentSound && currentSound !== sound) {
        await sound.unloadAsync();
        return;
      }

      currentSound = sound;
      currentSoundAsset = soundAsset;

      // Adiciona listener para monitorar o status do áudio
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          // Se o som parou de tocar por algum motivo (que não seja mute ou fim natural)
          if (!status.isPlaying && !isMuted && !status.didJustFinish && !isChangingTrack) {
            console.log('Som parou de tocar, tentando reiniciar...');
            await sound.playAsync();
          }

          // Se a música terminou naturalmente, toca a próxima
          if (status.didJustFinish && !isChangingTrack) {
            console.log('Música terminou, tocando próxima...');
            await playNextInPlaylist();
          }
        }
      });

      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
      
      // Tenta novamente se ainda não atingiu o número máximo de tentativas
      if (retryCount < MAX_RETRIES) {
        console.log(`Tentando reproduzir o som novamente (tentativa ${retryCount + 1} de ${MAX_RETRIES})...`);
        setTimeout(() => {
          playSound(soundAsset, retryCount + 1);
        }, RETRY_DELAY);
      } else {
        // Se falhou todas as tentativas, tenta a próxima música
        await playNextInPlaylist();
      }
    } finally {
      isChangingTrack = false;
    }
  };

  const stopSound = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }
        currentSound = null;
        currentSoundAsset = null;
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
      // Em caso de erro, ainda tentamos limpar a referência
      currentSound = null;
      currentSoundAsset = null;
    }
  };

  const playMainTheme = () => {
    currentPlaylistIndex = 0; // Reinicia a playlist do início
    return playSound('TEMA_PRINCIPAL');
  };

  const toggleMute = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.setVolumeAsync(isMuted ? 1 : 0);
          
          // Se estiver desmutando e o som não estiver tocando, reinicia a playlist
          if (!isMuted && !status.isPlaying && !isChangingTrack) {
            await playNextInPlaylist();
          }
        }
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  return {
    playSound,
    stopSound,
    playMainTheme,
    toggleMute,
    isMuted,
    playNextInPlaylist,
  };
};
