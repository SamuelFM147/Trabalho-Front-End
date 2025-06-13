import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from './styleEnd';

type RootStackParamList = {
  EndGame: {
    diasVigilia: number;
    salvos: number;
    sacrificados: number;
  };
  Home: undefined;
  PlayGame: undefined;
};
type EndGameScreenNavigationProp = NavigationProp<RootStackParamList>;
type EndGameScreenRouteProp = RouteProp<RootStackParamList, 'EndGame'>;
const EndScreen: React.FC = () => {
  const route = useRoute<EndGameScreenRouteProp>();
  const navigation = useNavigation<EndGameScreenNavigationProp>();
  const { diasVigilia, salvos, sacrificados } = route.params;
  const handleVoltarHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };
  const handleReiniciarJogo = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'PlayGame' }],
    });
  };
  return (
    <ImageBackground 
      source={require('../assets/SinFundo.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Fim da Jornada</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Dias de Vigília: <Text style={styles.salvos}>{diasVigilia}</Text>
          </Text>
          <Text style={styles.statsText}>
            Pessoas Salvas: <Text style={styles.salvos}>{salvos}</Text>
          </Text>
          <Text style={styles.statsText}>
            Pessoas Sacrificadas: <Text style={styles.sacrificados}>{sacrificados}</Text>
          </Text>
        </View>
        <Text style={styles.phrase}>
          "Cada escolha queima uma parte de nós. Agora, tudo silencia..."
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleVoltarHome}>
            <Text style={styles.buttonText}>Voltar ao Início</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.buttonReiniciar]} 
            onPress={handleReiniciarJogo}
          >
            <Text style={styles.buttonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default EndScreen;
