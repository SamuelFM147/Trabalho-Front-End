// --- INÍCIO DO ARQUIVO: src/hooks/useGameEngine.ts ---
import { useState, useCallback, useMemo } from 'react';
import { Scene, PossibleDestiny } from '../types/gameTypes';
import { GameManager } from '../constants/gameEngine/gameManager';

export const useGameEngine = () => {
  const gameManager = useMemo(() => new GameManager(), []);
  
  const [currentScene, setCurrentScene] = useState<Scene>(gameManager.getCurrentScene());
  const [availableChoices, setAvailableChoices] = useState<PossibleDestiny[]>(gameManager.getAvailableChoices());

  const makeChoice = useCallback((choice: PossibleDestiny) => {
    const nextScene = gameManager.makeChoice(choice.destino_id); // Corrigido: apenas 1 argumento
    if (nextScene) {
      setCurrentScene(nextScene);
      setAvailableChoices(gameManager.getAvailableChoices());
    } else {
      // Lidar com fim de jogo ou erro
      const finalScene = gameManager.getCurrentScene();
      if (finalScene && (finalScene.id.toString().startsWith('GAME_OVER') || finalScene.id.toString().startsWith('VITORIA'))) {
        setCurrentScene(finalScene);
        setAvailableChoices([]); // Não há mais escolhas
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
// --- FIM DO ARQUIVO: src/hooks/useGameEngine.ts ---