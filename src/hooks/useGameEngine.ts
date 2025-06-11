// --- INÍCIO DO ARQUIVO: src/hooks/useGameEngine.ts ---
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Scene, PossibleDestiny } from '../game/gameManager';
import { GameManager } from '../game/gameManager';

export const useGameEngine = () => {
  const gameManager = useMemo(() => new GameManager(), []);
  const [currentScene, setCurrentScene] = useState<Scene>(gameManager.getCurrentScene());
  const [availableChoices, setAvailableChoices] = useState<PossibleDestiny[]>(gameManager.getAvailableChoices());

  const makeChoice = useCallback((choice: PossibleDestiny) => {
    const nextScene = gameManager.makeChoice(choice.destino_id);
    if (nextScene) {
      setCurrentScene(nextScene);
      setAvailableChoices(gameManager.getAvailableChoices());
    } else {
      const finalScene = gameManager.getCurrentScene();
      if (finalScene) {
        setCurrentScene(finalScene);
        setAvailableChoices([]);
      }
    }
  }, [gameManager]);

  const restartGame = useCallback(() => {
    const initialScene = gameManager.startGame();
    setCurrentScene(initialScene);
    setAvailableChoices(gameManager.getAvailableChoices());
  }, [gameManager]);

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
// --- FIM DO ARQUIVO ---
