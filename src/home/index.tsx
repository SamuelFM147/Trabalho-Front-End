import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';
import { useAudio } from '../songGame/AudioSystem';

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { playMainTheme } = useAudio();

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

  const handleStartGame = () => {
    navigation.navigate('Game');
  };

  return (
    <TouchableOpacity
      style={styles.telaInteiraPreta}
      activeOpacity={0.9}
      onPress={handleStartGame}
    >
      <View style={styles.telaInteiraPreta}>
        <Image
          source={require('../assets/SinLOGO.png')}
          style={styles.logoImagem}
          resizeMode="contain"
        />
        <View style={styles.containerDoBotao}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.Textobotao}>Iniciar Jornada</Text>
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
