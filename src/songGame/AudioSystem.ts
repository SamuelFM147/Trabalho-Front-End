import { Audio } from 'expo-av';
import { useEffect } from 'react';

// Constante com o nome do arquivo do tema principal
export const AudioAssets = {
  TEMA_PRINCIPAL: 'Tema_Principal.mp3',
} as const;

// Caminho real do recurso de áudio
const audioResources: { [key: string]: any } = {
  'Tema_Principal.mp3': require('../assets/songs/Tema_Principal.mp3'),
};

// Classe para controle do áudio
class AudioManager {
  private static instance: AudioManager;
  private currentSound: Audio.Sound | null = null;
  private isPlaying: boolean = false;
  private lastPlayed: string | null = null;
  private isInitialized: boolean = false;
  private isMainThemePlaying: boolean = false;

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

  // Inicia o tema principal em loop com volume 50%
  public async playMainTheme(): Promise<void> {
    if (this.isMainThemePlaying) return;

    await this.initialize();
    const resource = audioResources[AudioAssets.TEMA_PRINCIPAL];

    try {
      if (this.currentSound) {
        await this.currentSound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        resource,
        {
          shouldPlay: true,
          isLooping: true,
          volume: 0.5,
        }
      );

      this.currentSound = sound;
      this.isPlaying = true;
      this.isMainThemePlaying = true;
      this.lastPlayed = AudioAssets.TEMA_PRINCIPAL;
    } catch (error) {
      console.error('Erro ao tocar o tema principal:', error);
    }
  }

  // Para o som atual
  public async stopSound(): Promise<void> {
    if (this.currentSound) {
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
        this.isPlaying = false;
        this.isMainThemePlaying = false;
      } catch (error) {
        console.error('Erro ao parar o som:', error);
      }
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
  getLastPlayedSound(): string | null {
    return this.lastPlayed;
  }
}


// Exporta a instância única do gerenciador
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
  };
};
