import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

// Caminho para o arquivo do tema principal
const TEMA_PRINCIPAL = require('../assets/songs/Tema_Principal.mp3');

// Define o tipo do contexto
interface AudioContextType {
  stopAudio: () => Promise<void>;
}

// Cria o contexto
const AudioContext = createContext<AudioContextType | null>(null);

// Provider global
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAndPlay = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          TEMA_PRINCIPAL,
          {
            shouldPlay: true,
            isLooping: true,
            volume: 0.5,
          }
        );

        if (isMounted) {
          soundRef.current = sound;
        }
      } catch (error) {
        console.error('Erro ao carregar o tema principal:', error);
      }
    };

    loadAndPlay();

    // Cleanup opcional ao desmontar o provider
    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Método opcional para parar o som manualmente
  const stopAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  return (
    <AudioContext.Provider value={{ stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook para usar o áudio em qualquer lugar
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
