import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text, View, Animated } from 'react-native';
import { useGameEngine } from '../game/gameManager';
import NarrativeText from '../components/NarrativeText';
import SceneDivider from '../components/SceneDivider';
import ChoiceList from '../components/ChoiceList';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import StoryEndScreen from '../game/storyEnd';

const localImages: Record<string, any> = {
  '../assets/id00.png': require('../assets/id00.png'),
  '../assets/id01.png': require('../assets/id01.png'),
  '../assets/id02.png': require('../assets/id02.png'),
  '../assets/id03.png': require('../assets/id03.png'),
  '../assets/id04.png': require('../assets/id04.png'),
  '../assets/id05.png': require('../assets/id05.png'),
  '../assets/id06.png': require('../assets/id06.png'),
  '../assets/id07.png': require('../assets/id07.png'),
  '../assets/id08.png': require('../assets/id08.png'),
  '../assets/id09.png': require('../assets/id09.png'),
  '../assets/id10.png': require('../assets/id10.png'),
  '../assets/id11.png': require('../assets/id11.png'),
  '../assets/id12.png': require('../assets/id12.png'),
  '../assets/id13.png': require('../assets/id13.png'),
  '../assets/id14.png': require('../assets/id14.png'),
  '../assets/id15.png': require('../assets/id15.png'),
  '../assets/id16.png': require('../assets/id16.png'),
  '../assets/id17.png': require('../assets/id17.png'),
  '../assets/id18.png': require('../assets/id18.png'),
  '../assets/id19.png': require('../assets/id19.png'),
  '../assets/id20.png': require('../assets/id20.png'),
  '../assets/id21.png': require('../assets/id21.png'),
  '../assets/id22.png': require('../assets/id22.png'),
  '../assets/id23.png': require('../assets/id23.png'),
  '../assets/id24.png': require('../assets/id24.png'),
  '../assets/id25.png': require('../assets/id25.png'),
  '../assets/id26.png': require('../assets/id26.png'),
  '../assets/id27.png': require('../assets/id27.png'),
  '../assets/id28.png': require('../assets/id28.png'),
  '../assets/id29.png': require('../assets/id29.png'),
  '../assets/id30.png': require('../assets/id30.png'),
  '../assets/id31.png': require('../assets/id31.png'),
  '../assets/id32.png': require('../assets/id32.png'),
  '../assets/id33.png': require('../assets/id33.png'),
  '../assets/id34.png': require('../assets/id34.png'),
  '../assets/id35.png': require('../assets/id35.png'),
  '../assets/id36.png': require('../assets/id36.png'),
  '../assets/id37.png': require('../assets/id37.png'),
  '../assets/id38.png': require('../assets/id38.png'),
  '../assets/id39.png': require('../assets/id39.png'),
  '../assets/id40.png': require('../assets/id40.png'),
  '../assets/id41.png': require('../assets/id41.png'),
  '../assets/id42.png': require('../assets/id42.png'),
  '../assets/id43.png': require('../assets/id43.png'),
  '../assets/id90.png': require('../assets/id90.png'),
  '../assets/id95.png': require('../assets/id95.png'),
  '../assets/SinLogo.png': require('../assets/SinLogo.png'),
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
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      // Rola para o topo
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
      await makeChoice(choice);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };
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
      <StoryEndScreen
        message={currentScene.mensagem || (isGameOver ? "Sua jornada chegou ao fim..." : "Você conquistou a vitória!")}
        onRestart={handleRestart}
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
              resizeMode="contain"
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