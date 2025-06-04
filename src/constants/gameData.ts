// --- INÍCIO DO ARQUIVO: src/constants/gameData.ts ---
import { GameData, PlayerState } from '../types/gameTypes';
import { jsonData as gameData } from '../escolhas/escolhas';

// Exportando os dados do jogo importados do arquivo escolhas.ts
export const gameStories: GameData = gameData;

// ID da cena inicial do jogo
export const INITIAL_SCENE_ID = 0;

// --- FIM DO ARQUIVO: src/constants/gameData.ts ---