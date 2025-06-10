import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';
import { useAudio } from '../songGame/AudioSystem';
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { playMainTheme } = useAudio();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Animação de piscar do botão
    const blinkAnimation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(blinkAnimation).start();

    // Tocar o tema principal
    playMainTheme();
  }, []);

  const handleStartJourney = () => {
    setShowVideo(true);
  };

  const handleSkipVideo = () => {
    setShowVideo(false);
    navigation.navigate('Game');
  };

  const handleVideoComplete = () => {
    setShowVideo(false);
    navigation.navigate('Game');
  };

  if (showVideo) {
    return (
      <VideoPlayer
        onSkip={handleSkipVideo}
        onComplete={handleVideoComplete}
      />
    );
  }

  return (
    <View style={styles.telaInteiraPreta}>
      <Image
        source={require('../assets/SinLogo.png')}
        style={styles.logoImagem}
        resizeMode="contain"
      />

      <View style={styles.containerDoBotao}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity 
            onPress={handleStartJourney}
          >
            <Text style={styles.Textobotao}>Iniciar Jornada</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('PlayGame')}
          >
            <Text style={styles.Textobotao}>Iniciar Jornada 2</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
