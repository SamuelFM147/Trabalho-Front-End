import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native'; // Image foi adicionado, ImageBackground removido
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';

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
  }, []);

  return (
    // tirando o imageBackground e colocando uma view normal, para nao dar erro de dimensionamento de imagem
    // e colocando o estilo telaInteiraPreta para a view, assim ela vai ocupar toda a tela e a logo nao vai bugar mais
    <TouchableOpacity 
      style={styles.telaInteiraPreta} 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Game')}
    >
      {/*aqui é aonde esta a imagem do jogo*/}
      <View style={styles.telaInteiraPreta}>
        <Image
          source={require('../assets/SinLOGO.png')}
          style={styles.logoImagem} 
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
