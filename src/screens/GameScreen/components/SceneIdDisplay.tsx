// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/components/SceneIdDisplay.tsx ---
import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface SceneIdDisplayProps {
  id: number | string;
}

const SceneIdDisplay: React.FC<SceneIdDisplayProps> = ({ id }) => {
  // Apenas mostra o número do ID, como no protótipo (ex: "2", "1")
  const displayId = typeof id === 'string' && (id.startsWith('GAME_OVER') || id.startsWith('VITORIA')) ? 'FIM' : id.toString();
  
  return (
    <View style={styles.sceneIdContainer}>
      <Text style={styles.sceneIdText}>{displayId}</Text>
    </View>
  );
};

export default SceneIdDisplay;
// --- FIM DO ARQUIVO: src/screens/GameScreen/components/SceneIdDisplay.tsx ---