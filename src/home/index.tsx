import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native'; // Image foi adicionado, ImageBackground removido
import { useNavigation } from '@react-navigation/native';
import { styles } from './styleHome';

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    // tirando o imageBackground e colocando uma view normal, para nao dar erro de dimensionamento de imagem
    // e colocando o estilo telaInteiraPreta para a view, assim ela vai ocupar toda a tela e a logo nao vai bugar mais
    <View style={styles.telaInteiraPreta}>
      {/*aqui é aonde esta a imagem do jogo*/}
      <Image
        source={require('../assets/SinLOGO.png')}
        style={styles.logoImagem} 
        resizeMode="contain"
      />

      { /* aqui criei um novo estilo para o botao para caso seja necessario mudar-lo*/}
      <View style={styles.containerDoBotao}>
        <TouchableOpacity
          style={styles.button} // Seu estilo de botão existente
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.Textobotao}>Inciar Jornada</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
