
import React from 'react';
import { SafeAreaView, ScrollView, Image, Text, View } from 'react-native';
import { useGameEngine } from '../../hooks/useGameEngine';
import NarrativeText from '../../components/NarrativeText';
import SceneDivider from '../../components/SceneDivider';
import ChoiceList from '../../components/ChoiceList';
import { colors } from '../../constants/colors';
import { styles } from './styles'; 


const localImages = {
  '/assets/id0.jpeg': require('../../assets/id0.png'),
  '/assets/id2.jpeg': require('../../assets/id2.png'),
  '/assets/id3.png': require('../../assets/id3.png'),
  '/assets/id4.png': require('../../assets/id4.png'),
  '/assets/id5.png': require('../../assets/id5.png'),
  '/assets/id6.png': require('../../assets/id6.png'),
  '/assets/id8.png': require('../../assets/id8.png'),
  '/assets/id90.png': require('../../assets/id90.png'),
  '/assets/id91.png': require('../../assets/id91.png'),
  '/assets/id92.png': require('../../assets/id92.png'),
  '/assets/id94.png': require('../../assets/id94.png'),
  '/assets/id95.png': require('../../assets/id95.png'),
  
};

const GameScreen: React.FC = () => {
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

  
  const messageParts = currentScene.mensagem.split('[IMAGEM]');
  const textBeforeImage = messageParts[0] || '';
  const textAfterImage = messageParts[1] || '';
  const shouldRenderImageInline = messageParts.length > 1 && currentScene.imagem_url;

  
  if (isGameOver || isVictory) {
    const finalMessage = currentScene.mensagem || (isGameOver ? "Fim de Jogo." : "Vitória!");
    const finalImageSource = currentScene.imagem_url && localImages[currentScene.imagem_url]
      ? localImages[currentScene.imagem_url]
      : null;

    return (
      <SafeAreaView style={styles.endGameContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {finalImageSource && (
            <Image
              source={finalImageSource}
              style={styles.sceneImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.endGameText}>
            {finalMessage}
          </Text>
          <ChoiceList
            choices={[
              {
                descricao_opcao: 'Jogar Novamente',
                onPress: restartGame,
                code_condicao: 'reiniciar'
              },
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  
  const currentImageSource = currentScene.imagem_url && localImages[currentScene.imagem_url]
    ? localImages[currentScene.imagem_url]
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {}
        <NarrativeText text={textBeforeImage.trim()} />

        {}
        {shouldRenderImageInline && currentImageSource && (
          <Image
            source={currentImageSource}
            style={styles.sceneImage} 
            resizeMode="cover"
          />
        )}
        
        {}
        {shouldRenderImageInline && textAfterImage.trim().length > 0 && (
          <NarrativeText text={textAfterImage.trim()} />
        )}
        {}
        {!shouldRenderImageInline && <NarrativeText text={currentScene.mensagem} />}


        <SceneDivider sceneNumber={currentScene.id} />
        <ChoiceList
          choices={availableChoices.map(choice => ({
            descricao_opcao: choice.descricao_opcao,
            onPress: () => makeChoice(choice),
            code_condicao: choice.code_condicao,
          }))}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;