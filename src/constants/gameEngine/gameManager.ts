// --- INÍCIO DO ARQUIVO: src/gameEngine/gameManager.ts ---
import { Scene, PlayerState, PossibleDestiny, GameData } from '../../types/gameTypes';
import { gameStories, INITIAL_SCENE_ID, INITIAL_PLAYER_STATE } from '../gameData';

export class GameManager {
  private scenes: GameData;
  public currentScene: Scene;
  public playerState: PlayerState;

  constructor() {
    this.scenes = gameStories;
    this.playerState = { ...INITIAL_PLAYER_STATE }; // Assegura um estado inicial limpo
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
  }

  private findSceneById(id: number | string): Scene | undefined {
    return this.scenes.find(scene => scene.id === id);
  }

  public startGame(): Scene {
    this.playerState = { ...INITIAL_PLAYER_STATE }; // Reinicia o estado do jogador
    this.currentScene = this.findSceneById(INITIAL_SCENE_ID) || this.scenes[0];
    return this.currentScene;
  }

  public getCurrentScene(): Scene {
    return this.currentScene;
  }

  public getAvailableChoices(): PossibleDestiny[] {
    if (!this.currentScene || !this.currentScene.possiveis_destinos) {
      return [];
    }
    return this.currentScene.possiveis_destinos.filter(choice => {
      if (choice.requer_condicao) {
        // Verifica se todas as condições requeridas (se houver múltiplas separadas por vírgula, por exemplo) são verdadeiras
        // Por enquanto, o escolhas.js parece usar uma única string para requer_condicao.
        return !!this.playerState[choice.requer_condicao];
      }
      // Adicionalmente, para casos como a cena 5, onde duas opções dependem de estados opostos.
      // Ex: "Chegar com a criança" (requer tem_crianca) vs "Chegar sozinho" (requer !tem_crianca)
      // Isso pode ser tratado aqui ou garantindo que as opções no JSON estejam mutuamente exclusivas
      // com base nas condições. Se o ID da cena for 5 e a opção for "Chegar sozinho" (code_condicao),
      // ela só deve aparecer se !playerState.tem_crianca.
      // O arquivo escolhas.js fornecido não tem um "requer_condicao": "!tem_crianca" explícito para
      // a opção 5.2. Vamos assumir que se uma opção requer "tem_crianca", a outra implícita
      // requer "!tem_crianca" se elas levarem a diferentes mensagens ou desfechos iniciais na mesma cena de chegada.
      // Para simplificar e aderir ao que está no JSON, apenas `requer_condicao` é checado.
      // O fluxo para a cena 5.2 (chegar sozinho) deve ser garantido pelo game design de que se "tem_crianca"
      // for verdadeiro, o jogador será direcionado para 5.1.
      // Ou, poderíamos adicionar uma lógica de "exclui_se_condicao" se necessário.
      // Por ora, manteremos a lógica simples de `requer_condicao`.

      // Lógica para a bifurcação da cena 5:
      // Se currentScene.id é 5:
      //    Se choice.code_condicao é "Chegar com a criança", só mostrar se playerState.tem_crianca for true. (Já coberto por requer_condicao)
      //    Se choice.code_condicao é "Chegar sozinho", só mostrar se playerState.tem_crianca for false.
      if (this.currentScene.id === 5) {
        if (choice.code_condicao === "Chegar com a criança" && !this.playerState.tem_crianca) {
            return false;
        }
        if (choice.code_condicao === "Chegar sozinho" && this.playerState.tem_crianca) {
            return false;
        }
      }
       // Lógica para a bifurcação da cena 6.1.2:
       if (this.currentScene.id === "6.1.2") {
        const temCrianca = !!this.playerState.tem_crianca;
        if ((choice.code_condicao === "Tentar salvar a criança" || choice.code_condicao === "Abandonar a criança") && !temCrianca) {
            return false; // Não pode salvar/abandonar criança se não tem
        }
        if (choice.code_condicao === "Lutar sozinho na invasão" && temCrianca) {
            return false; // Não é a opção de lutar sozinho se tem criança
        }
      }


      return true;
    });
  }

  public makeChoice(choiceDestinoId: number | string, define_condicao?: string): Scene | null {
    const nextScene = this.findSceneById(choiceDestinoId);
    
    if (nextScene) {
      this.currentScene = nextScene;
      
      // Lógica para atualizar o estado do jogador com base na condição definida pela escolha
      if (define_condicao) {
        this.playerState[define_condicao] = true;
        console.log(`Condição definida: ${define_condicao} = true`);

        // Lidar com condições interdependentes ou que alteram outras
        switch (define_condicao) {
          case "ajudou_mendigo":
            // Se o jogador ajudou o mendigo, ele usou uma moeda.
            // Assumindo que "tem_dinheiro" era true para esta escolha ser possível.
            // Esta ação implica que o dinheiro foi gasto.
            if (this.playerState["tem_dinheiro"]) {
              this.playerState["tem_dinheiro"] = false;
              this.playerState["sem_dinheiro"] = true; // Definir explicitamente sem_dinheiro também
              console.log("Condição atualizada: tem_dinheiro = false, sem_dinheiro = true (devido a ajudar mendigo)");
            }
            break;
          case "sem_dinheiro":
            // Esta condição é definida explicitamente quando o jogador entrega o dinheiro aos bandidos.
            this.playerState["tem_dinheiro"] = false;
            console.log("Condição atualizada: tem_dinheiro = false (devido a sem_dinheiro)");
            break;
          // Adicione outros casos de interdependência de condições aqui, se necessário.
          // Exemplo: Se uma ação concede um item que é uma condição para outra.
          // case "pegou_espada_magica":
          //   this.playerState["tem_espada_magica"] = true;
          //   break;
        }
      }
      return this.currentScene;
    }
    
    // Tratar IDs de GAME_OVER ou VITORIA que podem não ser cenas de progressão, mas sim finais.
    // A lógica para isso já está no hook `useGameEngine`, que verifica `isGameOver` e `isVictory`.
    // Se o ID for um final, o findSceneById já deve retornar a cena de final correspondente do gameData.
    const endSceneCandidate = this.scenes.find(s => s.id === choiceDestinoId);
    if (endSceneCandidate && (endSceneCandidate.id.toString().startsWith('GAME_OVER') || endSceneCandidate.id.toString().startsWith('VITORIA'))) {
        this.currentScene = endSceneCandidate;
        // Não há mais condições a serem definidas em cenas finais, geralmente.
        return this.currentScene;
    }

    console.warn(`Cena com id ${choiceDestinoId} não encontrada e não é um final conhecido.`);
    return null; // Retorna null se a próxima cena não for encontrada e não for um final
  }

  public isGameOver(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('GAME_OVER');
  }

  public isVictory(): boolean {
    return typeof this.currentScene.id === 'string' && this.currentScene.id.startsWith('VITORIA');
  }

  public getPlayerState(): PlayerState {
    return { ...this.playerState }; // Retorna uma cópia para evitar mutação externa
  }
}
// --- FIM DO ARQUIVO: src/gameEngine/gameManager.ts ---