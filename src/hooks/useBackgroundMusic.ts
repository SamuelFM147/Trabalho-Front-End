import { useEffect } from 'react';
import { Audio } from 'expo-av';

let globalSound: Audio.Sound | null = null;

export const useBackgroundMusic = () => {
  useEffect(() => {
    const playBackgroundMusic = async () => {
      try {
        // Se já existe um som tocando, não cria outro
        if (globalSound) {
          return;
        }

        // Configura o áudio para modo de reprodução
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('../assets/songs/Tema_Principal.mp3'),
          {
            volume: 0.5,
            isLooping: true,
            shouldPlay: true,
          }
        );

        globalSound = sound;
      } catch (error) {
        console.error('Erro ao iniciar a música:', error);
      }
    };

    playBackgroundMusic();

    return () => {
      // Não desmonta o som ao desmontar o componente
      // Isso mantém a música tocando entre as telas
    };
  }, []);
}; 