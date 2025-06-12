import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../game/styles';

interface ChoiceItemProps {
  label: string;
  onPress: () => void;
  isRestartButton?: boolean;
  isVictory?: boolean;
  disabled?: boolean;
  isLast?: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ label, onPress, isRestartButton, isVictory, disabled }) => (
  <View style={[
    !isRestartButton && styles.shadowWrapper,
    disabled && styles.disabledWrapper
  ]}>
    {!isRestartButton ? (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          pressed && !disabled && styles.buttonPressed,
          disabled && styles.disabledButton
        ]}
      >
        <LinearGradient
          colors={disabled ? ['#333333', '#666666'] : ['#1a1a1a', '#8B4513']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <FontAwesome5 
              name="scroll" 
              size={18} 
              color={disabled ? "#999999" : "#FFD700"} 
              style={styles.icon} 
            />
            <Text style={[
              styles.text,
              disabled && styles.disabledText
            ]}>{label}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    ) : (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.restartButton,
          pressed && !disabled && styles.restartPressed,
          disabled && styles.disabledButton
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={[
            styles.text, 
            styles.restartText,
            isVictory && styles.victoryText,
            disabled && styles.disabledText
          ]}>{label}</Text>
        </View>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  shadowWrapper: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(230, 192, 104, 0.3)',
    borderRadius: 8,
    backgroundColor: 'rgba(26, 30, 35, 0.95)',
    shadowColor: '#E6C068',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 16,
  },
  button: {
    borderRadius: 8,
    borderColor: 'rgba(230, 192, 104, 0.2)',
    borderWidth: 1,
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
    opacity: 0.7,
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
    color: '#E6C068',
    fontSize: 18,
    fontFamily: 'serif',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
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
    backgroundColor: 'rgba(230, 192, 104, 0.1)',
  },
  restartText: {
    color: '#E6C068',
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
    color: '#E6C068',
    textShadowColor: 'rgba(230, 192, 104, 0.5)',
  },
  disabledWrapper: {
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.7,
  },
  disabledText: {
    color: '#999999',
  },
});

export default ChoiceItem; 