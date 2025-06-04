export interface PossibleDestiny {
    destino_id: string | number;
    code_condicao: string;
    descricao_opcao: string;
    requer_condicao?: string;
    define_condicao?: string; // Adicionado para definir uma condição após a escolha
  }
  
  export interface Scene {
    id: number | string;
    mensagem: string;
    possiveis_destinos: PossibleDestiny[];
    imagem?: string; // Opcional, baseado no seu protótipo que tem imagens no pergaminho
  }
  
  export interface PlayerState {
    [key: string]: boolean; // Para armazenar condições como tem_dinheiro, recebeu_conselho_mendigo, etc.
    // Adicione outros estados do jogador aqui, como itens, atributos, etc.
  }
  
  export type GameData = Scene[];