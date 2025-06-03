import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface ChoiceItemProps {
  label: string;
  onPress: () => void;
  isLast?: boolean;
  icon?: string;
  isGameOver?: boolean;
  isVictory?: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ 
  label, 
  onPress, 
  isLast, 
  icon = 'script-text',
  isGameOver = false,
  isVictory = false
}) => (
  <View style={[
    styles.shadowWrapper,
    isGameOver && styles.gameOverShadowWrapper
  ]}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isGameOver ? styles.gameOverButton : null,
        pressed && (isGameOver ? styles.gameOverPressed : styles.buttonPressed),
      ]}
    >
      {!isGameOver && (
        <LinearGradient
          colors={['#2c2c2c', '#8b4513']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Icon name={icon} size={22} color="#daa520" style={styles.icon} />
            <Text style={styles.text}>{label}</Text>
          </View>
        </LinearGradient>
      )}
      {isGameOver && (
        <View style={styles.contentContainer}>
          <Text style={[
            styles.gameOverText,
            isVictory && styles.victoryText
          ]}>{label}</Text>
        </View>
      )}
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  shadowWrapper: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#8b4513',
    borderRadius: 16,
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
    marginHorizontal: 16,
  },
  gameOverShadowWrapper: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  button: {
    borderRadius: 16,
    borderColor: '#daa520',
    borderWidth: 2,
    overflow: 'hidden',
    minHeight: 60,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 1,
  },
  gameOverButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  gameOverPressed: {
    opacity: 0.7,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    flex: 1,
  },
  icon: {
    marginRight: 24,
  },
  text: {
    color: '#daa520',
    fontSize: 18,
    fontFamily: 'serif',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  gameOverText: {
    color: '#ff4444',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  victoryText: {
    color: '#4CAF50', // Verde
  },
  divider: {
    display: 'none',
  },
  last: {
    borderBottomWidth: 0,
  },
});

export default ChoiceItem;