import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { audioManager, AudioAssets } from '../../../songGame/AudioSystem';

interface EndGameScreenProps {
  message: string;
  onRestart: () => void;
  isVictory: boolean;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({ message, onRestart, isVictory }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
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

    // Tocar o som apropriado
    const playSound = async () => {
      try {
        await audioManager.stopSound();
        if (isVictory) {
          await audioManager.playSound(AudioAssets.FINAL_BOM, true);
        } else {
          await audioManager.playSound(AudioAssets.TEMA_PRINCIPAL, true);
        }
      } catch (error) {
        console.error('Erro ao tocar áudio:', error);
      }
    };

    playSound();

    return () => {
      audioManager.stopSound().catch(() => {});
    };
  }, [isVictory]);

  const handleRestart = async () => {
    try {
      await audioManager.stopSound();
      onRestart();
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
      onRestart();
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={handleRestart}
    >
      <View style={styles.content}>
        <Text style={[
          styles.statusText,
          isVictory ? styles.victoryStatus : styles.defeatStatus
        ]}>
          {isVictory ? "Vitória!" : "Você Morreu!"}
        </Text>
        <Image
          source={require('../../../assets/SinLOGO.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[
          styles.message,
          isVictory ? styles.victoryMessage : styles.defeatMessage
        ]}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={[
              styles.buttonText,
              isVictory ? styles.victoryButton : styles.defeatButton
            ]}>
              {isVictory ? "Jogar Novamente" : "Tentar Novamente"}
            </Text>
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'serif',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  victoryMessage: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  defeatMessage: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  victoryButton: {
    color: '#00FF00',
    textShadowColor: 'rgba(0, 255, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  defeatButton: {
    color: '#FF0000',
    textShadowColor: 'rgba(255, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 20,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  victoryStatus: {
    color: '#00FF00',
    textShadowColor: 'rgba(0, 255, 0, 0.5)',
  },
  defeatStatus: {
    color: '#FF0000',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
  },
});

export default EndGameScreen; 