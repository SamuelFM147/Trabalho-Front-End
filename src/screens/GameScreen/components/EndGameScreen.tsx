import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

interface EndGameScreenProps {
  message: string;
  onRestart: () => void;
  isVictory: boolean;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({ message, onRestart, isVictory }) => {
  return (
    <View style={styles.container}>
      <Text style={[
        styles.message,
        isVictory ? styles.victoryText : styles.gameOverText
      ]}>
        {message}
      </Text>
      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartButtonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  message: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gameOverText: {
    color: '#FF0000',
  },
  victoryText: {
    color: '#00FF00',
    textShadowColor: 'rgba(0, 255, 0, 0.5)',
  },
  restartButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  restartButtonText: {
    color: '#FF0000',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default EndGameScreen; 