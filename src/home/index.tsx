import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.sequence([ // não faço ideia do pq mas se tirar crasha 
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
    
    <TouchableOpacity 
      style={styles.telaInteiraPreta} //TELA PRETA PARA O FUNDO DA HOME 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Game')}
    >
      <View style={styles.telaInteiraPreta}> 
        <Image 
          source={require('../assets/sinlogo.png')} //IMAGEM DO JOGO, FAZ PARTE DO HOME
          style={styles.logoImagem}  //NÃO DELETAR
          resizeMode="contain"
        />

  
        <View style={styles.containerDoBotao}> 
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.Textobotao}>Iniciar Jornada</Text>
          </Animated.View>
        </View>
      </View> 
    </TouchableOpacity>//Estilo do botão essa porrinha, da tela de home, foda bagarai
  );
}
