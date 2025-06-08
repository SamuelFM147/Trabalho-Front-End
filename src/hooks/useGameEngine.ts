// --- INÍCIO DO ARQUIVO: src/hooks/useGameEngine.ts ---
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Scene, PossibleDestiny } from '../game/gameManager';
import { GameManager } from '../game/gameManager';
import { useAudioContext } from '../songGame/AudioContext';

// Mapeamento de IDs de cena para arquivos de áudio
const sceneAudioMap: { [key: string | number]: keyof typeof AudioAssets } = {
  0: 'TEMA_PRINCIPAL',
  1: 'ID_1',
  2: 'ID_2',
  3: 'ID_3',
  '4': 'ID_4_A_6',
  '5': 'ID_4_A_6',
  '6': 'ID_4_A_6',
  91: 'ID_91',
  92: 'ID_92',
  94: 'ID_94',
  95: 'ID_95',
  'VITORIA': 'FINAL_BOM',
  'GAME_OVER': 'TEMA_PRINCIPAL'
};

export const useGameEngine = () => {
  const gameManager = useMemo(() => new GameManager(), []);
  const [currentScene, setCurrentScene] = useState<Scene>(gameManager.getCurrentScene());
  const [availableChoices, setAvailableChoices] = useState<PossibleDestiny[]>(gameManager.getAvailableChoices());
  const isFirstScene = useRef(true);
  const { playSceneAudio, stopAudio } = useAudioContext();

  // Efeito para tocar o áudio inicial
  useEffect(() => {
    if (currentScene && !isFirstScene.current) {
      playSceneAudio(currentScene.id);
    }
    if (isFirstScene.current) {
      isFirstScene.current = false;
    }
  }, [currentScene, playSceneAudio]);

  const makeChoice = useCallback(async (choice: PossibleDestiny) => {
    const nextScene = gameManager.makeChoice(choice.destino_id);
    if (nextScene) {
      setCurrentScene(nextScene);
      setAvailableChoices(gameManager.getAvailableChoices());
    } else {
      const finalScene = gameManager.getCurrentScene();
      if (finalScene && (finalScene.id.toString().startsWith('GAME_OVER') || finalScene.id.toString().startsWith('VITORIA'))) {
        setCurrentScene(finalScene);
        setAvailableChoices([]);
      }
    }
  }, [gameManager]);

  const restartGame = useCallback(async () => {
    await stopAudio();
    const initialScene = gameManager.startGame();
    setCurrentScene(initialScene);
    setAvailableChoices(gameManager.getAvailableChoices());
    await playSceneAudio(initialScene.id);
  }, [gameManager, playSceneAudio, stopAudio]);

  const isGameOver = gameManager.isGameOver();
  const isVictory = gameManager.isVictory();

  return {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  };
};
// --- FIM DO ARQUIVO: src/hooks/useGameEngine.ts ---