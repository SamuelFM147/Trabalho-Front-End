import { create } from 'zustand';

interface AudioState {
  isMuted: boolean;
  setIsMuted: (state: boolean) => void;
}

export const useAudioState = create<AudioState>((set) => ({
  isMuted: false,
  setIsMuted: (state: boolean) => set({ isMuted: state }),
})); 