import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';
import { audioManager, AudioAssets } from '../songGame/AudioSystem';

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
    const playTheme = async () => {
      try {
        await audioManager.stopSound();
        await audioManager.playSound(AudioAssets.TEMA_PRINCIPAL, true);
      } catch (error) {
        console.error('Erro ao tocar tema principal:', error);
      }
    };

    playTheme();

    return () => {
      audioManager.stopSound().catch(() => {});
    };
  }, []);

  const handleStartGame = async () => {
    try {
      await audioManager.stopSound();
      navigation.navigate('Game');
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
      navigation.navigate('Game');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.telaInteiraPreta} //TELA PRETA PARA O FUNDO DA HOME 
      activeOpacity={0.9}
      onPress={handleStartGame}
    >
      <View style={styles.telaInteiraPreta}> 
        <Image 
          source={require('../assets/SinLOGO.png')} //IMAGEM DO JOGO, FAZ PARTE DO HOME
          style={styles.logoImagem}  //NÃO DELETAR
          resizeMode="contain"
        />

        { /* aqui criei um novo estilo para o botao para caso seja necessario mudar-lo*/}
        <View style={styles.containerDoBotao}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.Textobotao}>Iniciar Jornada</Text>
          </Animated.View>
        </View>
      </View> 
    </TouchableOpacity>
  );
}
