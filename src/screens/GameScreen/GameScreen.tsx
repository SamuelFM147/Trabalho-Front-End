// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/GameScreen.tsx ---
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useGameEngine } from '../../hooks/useGameEngine';
import NarrativeText from '../../components/NarrativeText';
import SceneDivider from '../../components/SceneDivider';
import ChoiceList from '../../components/ChoiceList';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import EndGameScreen from './components/EndGameScreen';

// Se você estiver usando React Navigation, pode precisar dos tipos de props
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../../navigation/AppNavigator'; // Defina seu RootStackParamList

// type GameScreenProps = StackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC /* <GameScreenProps> */ = () => {
  const navigation = useNavigation();
  const {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  } = useGameEngine();

  const handleRestart = () => {
    restartGame();
    navigation.navigate('Home' as never);
  };

  if (!currentScene) {
    return (
      <SafeAreaView style={styles.container}>
        <NarrativeText text="Carregando jogo..." />
      </SafeAreaView>
    );
  }

  if (isGameOver || isVictory) {
    return (
      <EndGameScreen
        message={currentScene.mensagem || (isGameOver ? "Sua jornada chegou ao fim..." : "Você conquistou a vitória!")}
        onRestart={handleRestart}
        isVictory={isVictory}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <NarrativeText text={currentScene.mensagem} />
        <SceneDivider sceneNumber={currentScene.id} />
        <ChoiceList
          choices={availableChoices.map(choice => ({
            descricao_opcao: choice.descricao_opcao,
            onPress: () => makeChoice(choice),
          }))}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
});

export default GameScreen;
// --- FIM DO ARQUIVO: src/screens/GameScreen/GameScreen.tsx ---