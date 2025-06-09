import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text, View, Animated } from 'react-native';
import { useGameEngine } from '../../game/gameManager';
import NarrativeText from '../../components/NarrativeText';
import SceneDivider from '../../components/SceneDivider';
import ChoiceList from '../../components/ChoiceList';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import EndGameScreen from './EndGameScreen';
import { useAudioContext } from '../../songGame/AudioContext';

const localImages: Record<string, any> = {
  '/assets/id0.png': require('../../assets/id0.png'),
  '/assets/id2.png': require('../../assets/id2.png'),
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
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { stopAudio } = useAudioContext();
  
  const {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  } = useGameEngine();

  // Efeito para parar o áudio quando o componente é montado
  useEffect(() => {
    stopAudio();
  }, [stopAudio]);

  // Função para fazer a transição suave
  const handleSceneTransition = async (choice: any) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      // Rola para o topo
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
      
      // Faz a escolha
      await makeChoice(choice);
      
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };

  // Efeito para rolar suavemente quando a cena mudar
  useEffect(() => {
    if (scrollViewRef.current && !isTransitioning) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [currentScene, isTransitioning]);

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

  
  const messageParts = currentScene.mensagem.split('[IMAGEM]');
  const textBeforeImage = messageParts[0] || '';
  const textAfterImage = messageParts[1] || '';
  const shouldRenderImageInline = messageParts.length > 1 && currentScene.imagem_url;

  
  if (isGameOver || isVictory) {
    return (
      <EndGameScreen
        message={currentScene.mensagem || (isGameOver ? "Sua jornada chegou ao fim..." : "Você conquistou a vitória!")}
        onRestart={handleRestart}
        isVictory={isVictory}
      />
    );
  }

  const currentImageSource = currentScene.imagem_url && localImages[currentScene.imagem_url]
    ? localImages[currentScene.imagem_url]
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <NarrativeText text={textBeforeImage.trim()} />

          {shouldRenderImageInline && currentImageSource && (
            <Image
              source={currentImageSource}
              style={styles.sceneImage} 
              resizeMode="cover"
            />
          )}
          
          {shouldRenderImageInline && textAfterImage.trim().length > 0 && (
            <NarrativeText text={textAfterImage.trim()} />
          )}
          {!shouldRenderImageInline && <NarrativeText text={currentScene.mensagem} />}

          <SceneDivider sceneNumber={currentScene.id} />
          <ChoiceList
            choices={availableChoices.map(choice => ({
              descricao_opcao: choice.descricao_opcao,
              onPress: () => handleSceneTransition(choice),
              disabled: isTransitioning
            }))}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;