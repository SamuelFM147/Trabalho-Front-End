// --- INÍCIO DO ARQUIVO: src/hooks/useGameEngine.ts ---
import { useState, useCallback, useMemo } from 'react';
import { Scene, PossibleDestiny, PlayerState } from '../types/gameTypes';
import { GameManager } from '../constants/gameEngine/gameManager';

export const useGameEngine = () => {
  const gameManager = useMemo(() => new GameManager(), []);
  
  const [currentScene, setCurrentScene] = useState<Scene>(gameManager.getCurrentScene());
  const [playerState, setPlayerState] = useState<PlayerState>(gameManager.getPlayerState());
  const [availableChoices, setAvailableChoices] = useState<PossibleDestiny[]>(gameManager.getAvailableChoices());

  const makeChoice = useCallback((choice: PossibleDestiny) => {
    const nextScene = gameManager.makeChoice(choice.destino_id, choice.define_condicao);
    if (nextScene) {
      setCurrentScene(nextScene);
      setPlayerState(gameManager.getPlayerState());
      setAvailableChoices(gameManager.getAvailableChoices());
    } else {
      // Lidar com fim de jogo ou erro
      // Se for um final (GAME_OVER, VITORIA), gameManager.makeChoice já atualiza currentScene
      const finalScene = gameManager.getCurrentScene();
       if (finalScene && (finalScene.id.toString().startsWith('GAME_OVER') || finalScene.id.toString().startsWith('VITORIA'))) {
        setCurrentScene(finalScene);
        setPlayerState(gameManager.getPlayerState());
        setAvailableChoices([]); // Não há mais escolhas
      }
    }
  }, [gameManager]);

  const restartGame = useCallback(() => {
    const initialScene = gameManager.startGame();
    setCurrentScene(initialScene);
    setPlayerState(gameManager.getPlayerState());
    setAvailableChoices(gameManager.getAvailableChoices());
  }, [gameManager]);

  const isGameOver = gameManager.isGameOver();
  const isVictory = gameManager.isVictory();

  return {
    currentScene,
    playerState,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  };
};
// --- FIM DO ARQUIVO: src/hooks/useGameEngine.ts ---