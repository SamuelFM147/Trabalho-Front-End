import { Scene, GameData } from '../../types/gameTypes';
import { gameStories, INITIAL_SCENE_ID } from '../gameData';

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