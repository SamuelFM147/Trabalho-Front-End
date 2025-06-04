// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/GameScreen.tsx ---
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useGameEngine } from '../../hooks/useGameEngine';
import NarrativeText from '../../components/NarrativeText';
import SceneDivider from '../../components/SceneDivider';
import ChoiceList from '../../components/ChoiceList';
import { colors } from '../../constants/colors';

// Se você estiver usando React Navigation, pode precisar dos tipos de props
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../../navigation/AppNavigator'; // Defina seu RootStackParamList

// type GameScreenProps = StackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC /* <GameScreenProps> */ = () => {
  const {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  } = useGameEngine();

  if (!currentScene) {
    return (
      <SafeAreaView style={styles.container}>
        <NarrativeText text="Carregando jogo..." />
      </SafeAreaView>
    );
  }

  if (isGameOver || isVictory) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <NarrativeText 
            text={currentScene.mensagem || (isGameOver ? "Fim de Jogo." : "Vitória!")} 
          />
          <SceneDivider sceneNumber={currentScene.id} />
          <ChoiceList
            choices={[
              {
                descricao_opcao: 'Jogar Novamente',
                onPress: restartGame,
              },
            ]}
          />
        </ScrollView>
      </SafeAreaView>
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