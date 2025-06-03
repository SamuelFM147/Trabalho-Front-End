import React from 'react';
import { View } from 'react-native';
import ChoiceItem from './ChoiceItem';

interface Choice {
  descricao_opcao: string;
  onPress: () => void;
  isGameOver?: boolean;
  isVictory?: boolean;
}

interface ChoiceListProps {
  choices: Choice[];
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices }) => {
  return (
    <View>
      {choices.map((choice, index) => (
        <ChoiceItem
          key={index}
          label={choice.descricao_opcao}
          onPress={choice.onPress}
          isLast={index === choices.length - 1}
          isGameOver={choice.isGameOver}
          isVictory={choice.isVictory}
        />
      ))}
    </View>
  );
};

export default ChoiceList; 