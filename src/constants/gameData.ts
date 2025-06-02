// --- INÍCIO DO ARQUIVO: src/constants/gameData.ts ---
import { GameData, PlayerState } from '../types/gameTypes';
import { jsonData as gameData } from '../escolhas/escolhas';

// Exportando os dados do jogo importados do arquivo escolhas.ts
export const gameStories: GameData = gameData;

// ID da cena inicial do jogo
export const INITIAL_SCENE_ID = 0;

// Estado inicial do jogador
export const INITIAL_PLAYER_STATE: PlayerState = {
  tem_dinheiro: true,
  recebeu_conselho_mendigo: false,
  tem_crianca: false,
  amizade_homem_cemiterio: false,
  ajudou_mendigo: false,
  sem_dinheiro: false,
  perna_ferida: false,
  juntou_resistencia: false,
  conheceu_medica: false,
};
// --- FIM DO ARQUIVO: src/constants/gameData.ts ---