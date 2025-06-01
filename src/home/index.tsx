import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={require('../assets/SinLOGO.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
