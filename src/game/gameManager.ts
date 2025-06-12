import { jsonData as gameData } from '../escolhas/escolhas';
import { useState, useCallback, useMemo } from 'react';


export interface PossibleDestiny { // trazendo modos e cenas de types e fundindo com gameManager
  destino_id: string | number;
  descricao_opcao: string;
  define_condicao?: string;
}

export interface Scene {
  id: number | string;
  mensagem: string;
  possiveis_destinos: PossibleDestiny[];
  imagem_url?: string; 
}

// Exportando os dados do jogo importados do arquivo escolhas.ts
export const gameStories: GameData = gameData;

// ID da cena inicial do jogo
export const INITIAL_SCENE_ID = "0";

export type GameData = Scene[];

export class GameManager {
  private scenes: GameData;
  public currentScene: Scene;
  
  private gameLog: string[] = [];

  constructor() {
    this.scenes = gameStories
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
    
  }

  private findSceneById(id: number | string): Scene | undefined {
    return this.scenes.find(scene => scene.id === id);
  }

  public startGame(): Scene {
    
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
    this.gameLog = [];
    
    return this.currentScene;
  }

  public getCurrentScene(): Scene {
    return this.currentScene;
  }

  public getAvailableChoices() {
    if (!this.currentScene || !this.currentScene.possiveis_destinos) {
     
      return [];
    }

    const choices = this.currentScene.possiveis_destinos
   
    return choices;
  }
  public makeChoice(choiceDestinoId: number | string): Scene | null {
    
    
    // Encontrar e definir próxima cena
    const nextScene = this.findSceneById(choiceDestinoId);
    
    if (nextScene) {
      this.currentScene = nextScene;
      return this.currentScene;
    }
    
    // Verificar finais de jogo
    const endSceneCandidate = this.scenes.find(s => s.id === choiceDestinoId);
    if (endSceneCandidate && (
      endSceneCandidate.id.toString().startsWith('GAME_OVER') || 
      endSceneCandidate.id.toString().startsWith('VITORIA')
    )) {
      this.currentScene = endSceneCandidate;
      return this.currentScene;
    }

    return null;
  }

  public isGameOver(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('GAME_OVER');
  }

  public isVictory(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('VITORIA');
  }
}

// Passagem do HOOK inicia aqui NAO APAGUEM SEUS ARROMBADOS 

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
    const initialScene = gameManager.startGame(); // passagem para ter um novo game ao terminar cena 
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