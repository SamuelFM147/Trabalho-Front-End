import React, { createContext, useContext, useCallback, useRef } from 'react';
import { audioManager, AudioAssets } from './AudioSystem';

interface AudioContextType {
  playSceneAudio: (sceneId: string | number) => Promise<void>;
  stopAudio: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isPlayingRef = useRef(false);
  const isStoppingRef = useRef(false);

  const playSceneAudio = useCallback(async (sceneId: string | number) => {
    if (isPlayingRef.current) return;
    
    try {
      isPlayingRef.current = true;
      await stopAudio();

      // Se for uma cena de vitória, toca o som de vitória
      if (String(sceneId).startsWith('VITORIA')) {
        await audioManager.playSound(AudioAssets.FINAL_BOM, true);
        return;
      }

      // Se for uma cena de game over ou restart, toca o tema principal
      if (String(sceneId).startsWith('GAME_OVER') || String(sceneId) === 'RESTART') {
        await audioManager.playSound(AudioAssets.TEMA_PRINCIPAL, true);
        return;
      }

      // Para as outras cenas, toca um som aleatório
      await audioManager.playRandomSound(true);
    } finally {
      isPlayingRef.current = false;
    }
  }, []);

  const stopAudio = useCallback(async () => {
    if (isStoppingRef.current) return;
    
    try {
      isStoppingRef.current = true;
      await audioManager.stopSound();
    } finally {
      isStoppingRef.current = false;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playSceneAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}; 