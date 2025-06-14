import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';

interface StoryEndScreenProps {
  message: string;
  onRestart: () => void;
}
const StoryEndScreen: React.FC<StoryEndScreenProps> = ({ message, onRestart }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const blinkAnimation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]);
    const loop = Animated.loop(blinkAnimation);
    loop.start();
    return () => {
      loop.stop();
    };
  }, [fadeAnim]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.statusText}>
          Fim da Jornada
        </Text>
        <Image
          source={require('../assets/SinHome.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onRestart} activeOpacity={0.9}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.buttonText}>
                Voltar a Home
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    width: 300,
    height: 300,
    marginBottom: 30,
    borderRadius: 50,
  },
  message: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'FonteHome',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 40,
    fontFamily: 'FonteHome',
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    color: '#FF0000',
    textShadowColor: 'rgba(255, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusText: {
    fontSize: 46,
    fontFamily: 'FonteHome',
    marginBottom: 20,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    color: '#FF0000',
    textShadowColor: '#000',
  },
});
export default StoryEndScreen;