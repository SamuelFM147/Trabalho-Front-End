import { Audio } from 'expo-av';
import { useEffect } from 'react';

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

// Classe para controle do áudio
class AudioManager {
  private static instance: AudioManager;
  private currentSound: Audio.Sound | null = null;
  private isPlaying: boolean = false;
  private currentMusicIndex: number = 0;
  private isInitialized: boolean = false;
  private nextSoundPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar áudio:', error);
    }
  }

  private getRandomMusicIndex(): number {
    const musicList = Object.values(AudioAssets);
    return Math.floor(Math.random() * musicList.length);
  }

  private async unloadCurrentSound(): Promise<void> {
    if (this.currentSound) {
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      } catch (error) {
        console.error('Erro ao descarregar som:', error);
      }
    }
  }

  // Inicia uma música aleatória com volume 50%
  public async playMainTheme(): Promise<void> {
    // Se já estiver tocando, não faz nada
    if (this.isPlaying) {
      return;
    }

    // Se houver uma próxima música sendo carregada, espera ela terminar
    if (this.nextSoundPromise) {
      await this.nextSoundPromise;
    }

    await this.initialize();
    
    try {
      // Marca que está tocando antes de começar o processo
      this.isPlaying = true;

      await this.unloadCurrentSound();

      const musicList = Object.values(AudioAssets);
      this.currentMusicIndex = this.getRandomMusicIndex();
      
      const { sound } = await Audio.Sound.createAsync(
        musicList[this.currentMusicIndex],
        {
          shouldPlay: true,
          volume: 0.5,
        }
      );

      // Configura o evento para tocar a próxima música quando a atual terminar
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          this.currentMusicIndex = (this.currentMusicIndex + 1) % musicList.length;
          // Armazena a promessa da próxima música
          this.nextSoundPromise = this.playMainTheme();
          await this.nextSoundPromise;
          this.nextSoundPromise = null;
        }
      });

      this.currentSound = sound;
    } catch (error) {
      console.error('Erro ao tocar música:', error);
      this.isPlaying = false;
    }
  }

  // Para o som atual
  public async stopSound(): Promise<void> {
    try {
      await this.unloadCurrentSound();
      this.isPlaying = false;
    } catch (error) {
      console.error('Erro ao parar o som:', error);
    }
  }

  // Ajusta o volume (0 a 1)
  public async setVolume(volume: number): Promise<void> {
    if (this.currentSound) {
      try {
        await this.currentSound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      } catch (error) {
        console.error('Erro ao ajustar volume:', error);
      }
    }
  }

  // Retorna se está tocando ou não
  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

// Singleton instance
export const audioManager = AudioManager.getInstance();

// Hook para controlar áudio no React
export const useAudio = () => {
  useEffect(() => {
    audioManager.initialize();
    return () => {};
  }, []);

  return {
    playMainTheme: () => audioManager.playMainTheme(),
    stopSound: () => audioManager.stopSound(),
    setVolume: (volume: number) => audioManager.setVolume(volume),
    isPlaying: () => audioManager.isCurrentlyPlaying(),
  };
};
