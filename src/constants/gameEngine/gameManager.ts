import { Scene, PlayerState, PossibleDestiny, GameData } from '../../types/gameTypes';
import { gameStories, INITIAL_SCENE_ID, INITIAL_PLAYER_STATE } from '../gameData';

export class GameManager {
  private scenes: GameData;
  public currentScene: Scene;
  public playerState: PlayerState;
  private gameLog: string[] = [];

  constructor() {
    this.scenes = gameStories;
    this.playerState = { ...INITIAL_PLAYER_STATE };
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
    this.logGameState('Game initialized');
  }

  private logGameState(action: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${action}\n  Scene: ${this.currentScene.id}\n  State: ${JSON.stringify(this.playerState)}`;
    this.gameLog.push(logEntry);
    console.log(logEntry);
  }

  public getGameLog(): string[] {
    return [...this.gameLog];
  }

  private findSceneById(id: number | string): Scene | undefined {
    return this.scenes.find(scene => scene.id === id);
  }

  public startGame(): Scene {
    this.playerState = { ...INITIAL_PLAYER_STATE };
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
    this.gameLog = [];
    this.logGameState('Game started');
    return this.currentScene;
  }

  public getCurrentScene(): Scene {
    return this.currentScene;
  }

  private evaluateCondition(choice: PossibleDestiny): { isAvailable: boolean; reason?: string } {
    // 1. Verificar condição explícita (requer_condicao)
    if (choice.requer_condicao && !this.playerState[choice.requer_condicao]) {
      return {
        isAvailable: false,
        reason: `Required condition '${choice.requer_condicao}' not met`
      };
    }

    // 2. Verificar condições específicas por cena
    if (this.currentScene.id === 5) {
      if (choice.code_condicao === "Chegar com a criança" && !this.playerState.tem_crianca) {
        return {
          isAvailable: false,
          reason: "Cannot arrive with child - don't have child"
        };
      }
      if (choice.code_condicao === "Chegar sozinho" && this.playerState.tem_crianca) {
        return {
          isAvailable: false,
          reason: "Cannot arrive alone - have child"
        };
      }
    } else if (this.currentScene.id === "6.1.2") {
      const temCrianca = !!this.playerState.tem_crianca;
      if ((choice.code_condicao === "Tentar salvar a criança" || 
           choice.code_condicao === "Abandonar a criança") && !temCrianca) {
        return {
          isAvailable: false,
          reason: "Child-related choices unavailable - don't have child"
        };
      }
      if (choice.code_condicao === "Lutar sozinho na invasão" && temCrianca) {
        return {
          isAvailable: false,
          reason: "Cannot fight alone - have child"
        };
      }
    }

    return { isAvailable: true };
  }

  public getAvailableChoices(): PossibleDestiny[] {
    if (!this.currentScene || !this.currentScene.possiveis_destinos) {
      this.logGameState('No choices available - invalid scene state');
      return [];
    }

    const choices = this.currentScene.possiveis_destinos.filter(choice => {
      const evaluation = this.evaluateCondition(choice);
      if (!evaluation.isAvailable) {
        this.logGameState(`Choice "${choice.descricao_opcao}" filtered out: ${evaluation.reason}`);
      }
      return evaluation.isAvailable;
    });

    this.logGameState(`Available choices: ${choices.map(c => c.descricao_opcao).join(', ')}`);
    return choices;
  }

  private updatePlayerState(define_condicao?: string) {
    if (!define_condicao) return;

    const previousState = { ...this.playerState };
    this.playerState[define_condicao] = true;

    // Lógica para condições interdependentes
    switch (define_condicao) {
      case "ajudou_mendigo":
        this.playerState["tem_dinheiro"] = false;
        this.playerState["sem_dinheiro"] = true;
        break;
      case "sem_dinheiro":
        this.playerState["tem_dinheiro"] = false;
        break;
      case "tem_crianca":
        // Exemplo: se pegar a criança, não está mais sozinho
        this.playerState["sozinho"] = false;
        break;
      case "perdeu_crianca":
        this.playerState["tem_crianca"] = false;
        this.playerState["sozinho"] = true;
        break;
    }

    const stateChanges = Object.entries(this.playerState)
      .filter(([key, value]) => previousState[key] !== value)
      .map(([key, value]) => `${key}: ${previousState[key]} -> ${value}`)
      .join(', ');

    this.logGameState(`State updated - ${stateChanges}`);
  }

  public makeChoice(choiceDestinoId: number | string, define_condicao?: string): Scene | null {
    this.logGameState(`Making choice - Destination: ${choiceDestinoId}, Condition: ${define_condicao || 'none'}`);
    
    // Atualizar estado do jogador
    this.updatePlayerState(define_condicao);

    // Encontrar e definir próxima cena
    const nextScene = this.findSceneById(choiceDestinoId);
    
    if (nextScene) {
      this.currentScene = nextScene;
      this.logGameState(`Transitioned to scene ${nextScene.id}`);
      return this.currentScene;
    }
    
    // Verificar finais de jogo
    const endSceneCandidate = this.scenes.find(s => s.id === choiceDestinoId);
    if (endSceneCandidate && (
      endSceneCandidate.id.toString().startsWith('GAME_OVER') || 
      endSceneCandidate.id.toString().startsWith('VITORIA')
    )) {
      this.currentScene = endSceneCandidate;
      this.logGameState(`Game ended - ${endSceneCandidate.id}`);
      return this.currentScene;
    }

    this.logGameState(`Error: Invalid destination ${choiceDestinoId}`);
    return null;
  }

  public isGameOver(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('GAME_OVER');
  }

  public isVictory(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('VITORIA');
  }

  public getPlayerState(): PlayerState {
    return { ...this.playerState };
  }

  // Método de debug para verificar o estado atual do jogo
  public debugGameState(): void {
    console.log('\n=== GAME STATE DEBUG ===');
    console.log('Current Scene:', this.currentScene.id);
    console.log('Player State:', this.playerState);
    console.log('Available Choices:', this.getAvailableChoices().map(c => ({
      description: c.descricao_opcao,
      destination: c.destino_id,
      requiredCondition: c.requer_condicao || 'none',
      conditionCode: c.code_condicao || 'none'
    })));
    console.log('=====================\n');
  }
}