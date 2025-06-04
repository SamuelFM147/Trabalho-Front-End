
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '../styles';
import { PossibleDestiny } from '../../../types/gameTypes';

interface ChoiceButtonProps {
  choice: PossibleDestiny;
  onPress: (choice: PossibleDestiny) => void;
}


const getIconForChoice = (codeCondicao: string): string => {
  if (codeCondicao.toLowerCase().includes('matar')) return '⚔️';
  if (codeCondicao.toLowerCase().includes('observar')) return '👁️';
  if (codeCondicao.toLowerCase().includes('ajudar')) return '🤝';
  if (codeCondicao.toLowerCase().includes('esconder')) return '👻';
  if (codeCondicao.toLowerCase().includes('saquear')) return '💰';
  if (codeCondicao.toLowerCase().includes('conversar')) return '💬';
  if (codeCondicao.toLowerCase().includes('caminhando')) return '🚶';
  if (codeCondicao.toLowerCase().includes('seguir')) return '➡️';
  return '🔘'; 
};

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onPress }) => {
  const icon = getIconForChoice(choice.code_condicao);

  return (
    <TouchableOpacity style={styles.choiceButton} onPress={() => onPress(choice)}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.choiceButtonText}>{choice.descricao_opcao}</Text>
    </TouchableOpacity>
  );
};

export default ChoiceButton;
