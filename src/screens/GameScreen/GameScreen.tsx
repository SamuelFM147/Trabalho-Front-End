// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/GameScreen.tsx ---
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  } = useGameEngine();

  const handleRestartGame = () => {
    restartGame();
    navigation.navigate('Home' as never);
  };

  const isVictoryScene = currentScene.id.toString().startsWith('VITORIA');

  if (!currentScene) {
    return (
      <SafeAreaView style={styles.container}>
        <NarrativeText text="Carregando jogo..." />
      </SafeAreaView>
    );
  }

  if (isGameOver || isVictory) {
    return (
      <SafeAreaView style={[styles.container, styles.endGameContainer]}>
        <View style={styles.endGameContent}>
          <Image
            source={require('../../assets/SinLOGO.png')}
            style={styles.gameLogo}
            resizeMode="contain"
          />
          
          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusTitle,
              { color: isGameOver ? '#ff4444' : '#4CAF50' }
            ]}>
              {isGameOver ? 'Você Morreu' : 'Vitória!'}
            </Text>
            <Text style={styles.statusMessage}>
              {currentScene.mensagem}
            </Text>
          </View>

          <View style={styles.dividerLine} />

          <ChoiceList
            choices={[
              {
                descricao_opcao: 'Jogar Novamente',
                onPress: handleRestartGame,
                isGameOver: true,
                isVictory: isVictory
              },
            ]}
          />
        </View>
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
            isVictory: isVictoryScene
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
  endGameContainer: {
    backgroundColor: colors.black,
  },
  endGameContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameLogo: {
    width: '80%',
    height: 120,
    marginBottom: 40,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusMessage: {
    fontSize: 18,
    color: colors.choiceText,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 24,
  },
  dividerLine: {
    width: '80%',
    height: 2,
    backgroundColor: colors.choiceText,
    opacity: 0.3,
    marginVertical: 30,
  },
});

export default GameScreen;
// --- FIM DO ARQUIVO: src/screens/GameScreen/GameScreen.tsx ---