import React, { useEffect, useRef, useState } from 'react';
import {View,Image,TouchableOpacity,Text,Animated,Dimensions,StyleSheet,AppState,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudio } from '../components/AudioSystem';
import VideoPlayer from '../components/VideoPlayer';
import { styles } from './styleHome';
const { width, height } = Dimensions.get('window');
const Particle = ({ left, delay }: { left: number; delay: number }) => {
  const fallAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fallAnim, {
          toValue: height,
          duration: 8000 + Math.random() * 3000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(fallAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay]);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left,
        width: 2,
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.04)',
        transform: [{ translateY: fallAnim }],
      }}
    />
  );
};
export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { playMainTheme, stopSound } = useAudio();
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
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
      ])
    ).start();
  }, []);  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (!showVideo) {
        console.log('Home: Tela focada, iniciando música...');
        setTimeout(async () => {
          await playMainTheme();
        }, 500);
      }
    });
    const setupInitialAudio = async () => {
      if (!showVideo) {
        console.log('Home: Componente montado, iniciando música...');
        await playMainTheme();
      }
    };
    setupInitialAudio();
    return unsubscribe;
  }, [navigation, showVideo, playMainTheme]);
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
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    left: Math.random() * width,
    delay: Math.random() * 6000,
  }));
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#000000', '#0b0f1a', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />
      {particles.map((p, i) => (
        <Particle key={i} left={p.left} delay={p.delay} />
      ))}
      <View style={styles.containerDoConteudo}>
        <Image
          source={require('../assets/SinLogo.png')}
          style={styles.logoImagem}
          resizeMode="contain"
        />
        <View style={styles.containerDoBotao}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={handleStartJourney}>
              <Text style={styles.Textobotao}>Story Game</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PlayGame')}>
              <Text style={styles.Textobotao}>Iniciar Jornada</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Credits')}>
              <Text style={styles.Textobotao}>Créditos</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}