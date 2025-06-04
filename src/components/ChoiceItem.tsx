import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface ChoiceItemProps {
  label: string;
  onPress: () => void;
  isRestartButton?: boolean;
  isVictory?: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ label, onPress, isRestartButton, isVictory }) => (
  <View style={[
    !isRestartButton && styles.shadowWrapper,
  ]}>
    {!isRestartButton ? (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={['#1a1a1a', '#8B4513']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <FontAwesome5 name="scroll" size={18} color="#FFD700" style={styles.icon} />
            <Text style={styles.text}>{label}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    ) : (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.restartButton,
          pressed && styles.restartPressed,
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={[
            styles.text, 
            styles.restartText,
            isVictory && styles.victoryText
          ]}>{label}</Text>
        </View>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  shadowWrapper: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
    marginHorizontal: 16,
  },
  button: {
    borderRadius: 16,
    borderColor: '#CD853F',
    borderWidth: 2,
    overflow: 'hidden',
    minHeight: 50,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 40,
  },
  icon: {
    marginRight: 18,
    marginLeft: 2,
    width: 20,
    alignSelf: 'center',
  },
  text: {
    color: '#FFD700',
    fontSize: 18,
    fontFamily: 'serif',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
  },
  restartButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 10,
  },
  restartPressed: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  restartText: {
    color: '#FF0000',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  victoryText: {
    color: '#00FF00',  // Verde brilhante
    textShadowColor: 'rgba(0, 255, 0, 0.5)',
  },
});

export default ChoiceItem; 