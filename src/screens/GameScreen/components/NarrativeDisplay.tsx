// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/components/NarrativeDisplay.tsx ---
import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../styles';
import { Scene } from '../../../types/gameTypes';

interface NarrativeDisplayProps {
  scene: Scene;
}

const NarrativeDisplay: React.FC<NarrativeDisplayProps> = ({ scene }) => {
  // Mapeamento de imagens disponíveis
  const imageSources: { [key: string]: any } = {
    'SinSplash.png': require('../../../assets/SinSplash.png'),
    'SinLOGO.png': require('../../../assets/SinLOGO.png'),
    'SinIcon.png': require('../../../assets/SinIcon.png'),
    'SinHome.png': require('../../../assets/SinHome.png')
  };
  return (
    <ScrollView style={styles.narrativeContainer}>
      {scene.imagem && imageSources[scene.imagem] && (
        <Image source={imageSources[scene.imagem]} style={styles.sceneImage} />
      )}
      <Text style={styles.narrativeText}>{scene.mensagem}</Text>
    </ScrollView>
  );
};

export default NarrativeDisplay;
// --- FIM DO ARQUIVO: src/screens/GameScreen/components/NarrativeDisplay.tsx ---