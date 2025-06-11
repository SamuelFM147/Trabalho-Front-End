import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text, View, Animated } from 'react-native';
import { useGameEngine } from '../../game/gameManager';
import NarrativeText from '../../components/NarrativeText';
import SceneDivider from '../../components/SceneDivider';
import ChoiceList from '../../components/ChoiceList';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import EndGameScreen from './EndGameScreen';

const localImages: Record<string, any> = {
  '/assets/id00.png': require('../../assets/id0.png'),
  '/assets/id01.png': require('../../assets/id01.png'),
  '/assets/id02.png': require('../../assets/id02.png'),
  '/assets/id03.png': require('../../assets/id03.png'),
  '/assets/id05.png': require('../../assets/id05.png'),
  '/assets/id07.png': require('../../assets/id07.png'),
  '/assets/id08.png': require('../../assets/id08.png'),
  '/assets/id10.png': require('../../assets/id10.png'),
  '/assets/id16.png': require('../../assets/id16.png'),
  '/assets/id18.png': require('../../assets/id18.png'),
  '/assets/id20.png': require('../../assets/id20.png'),
  '/assets/id22.png': require('../../assets/id22.png'),
  '/assets/id90.png': require('../../assets/id90.png'),
  '/assets/id94.png': require('../../assets/SinIcon.png'), // Fallback para id94.png que não existe
};

const GameScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const {
    currentScene,
    availableChoices,
    makeChoice,
    restartGame,
    isGameOver,
    isVictory,
  } = useGameEngine();

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

  if (isGameOver || isVictory) {
    return (
      <EndGameScreen
        message={currentScene.mensagem || (isGameOver ? "Sua jornada chegou ao fim..." : "Você conquistou a vitória!")}
        onRestart={handleRestart}
        isVictory={isVictory}
      />
    );
  }

  const messageParts = currentScene.mensagem.split('[IMAGEM]');
  const textBeforeImage = messageParts[0] || '';
  const textAfterImage = messageParts[1] || '';
  const shouldRenderImageInline = messageParts.length > 1 && currentScene.imagem_url;

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