import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';
import { useAudio } from '../songGame/AudioSystem';
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { playMainTheme, stopSound } = useAudio();
  const [showVideo, setShowVideo] = useState(false);

  // Efeito para iniciar a música quando o componente monta
  useEffect(() => {
    const setupAudio = async () => {
      if (!showVideo) {
        await stopSound(); // Garante que não há música tocando
        await playMainTheme();
      }
    };

    setupAudio();
  }, [showVideo]);

  const handleStartJourney = () => {
    setShowVideo(true);
  };

  const handleSkipVideo = async () => {
    setShowVideo(false);
    navigation.navigate('Game');
  };

  const handleVideoComplete = async () => {
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
            <Text style={styles.Textobotao}>Story Game</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('PlayGame')}
          >
            <Text style={styles.Textobotao}>Iniciar Jornada</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
