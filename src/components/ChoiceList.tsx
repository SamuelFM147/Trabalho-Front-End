import React from 'react';
import { View } from 'react-native';
import ChoiceItem from './ChoiceItem';
import { PossibleDestiny } from '../constants/gameManager';

interface ChoiceListProps {
  choices: Array<{
    descricao_opcao: string;
    onPress: () => void;
    isRestartButton?: boolean;
    disabled?: boolean;
  }>;
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices }) => (
  <View>
    {choices.map((choice, idx) => (
      <ChoiceItem
        key={idx}
        label={choice.descricao_opcao}
        onPress={choice.onPress}
        isLast={idx === choices.length - 1}
        isRestartButton={choice.isRestartButton}
        disabled={choice.disabled}
      />
    ))}
  </View>
);

export default ChoiceList; 