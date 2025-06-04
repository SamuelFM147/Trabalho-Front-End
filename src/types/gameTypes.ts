
export interface PossibleDestiny {
    destino_id: string | number;
    code_condicao: string;
    descricao_opcao: string;
    requer_condicao?: string;
    define_condicao?: string;
}

export interface Scene {
    id: number | string;
    mensagem: string;
    possiveis_destinos: PossibleDestiny[];
    imagem_url?: string; 
}

export interface PlayerState {
    [key: string]: boolean;
}

export type GameData = Scene[];