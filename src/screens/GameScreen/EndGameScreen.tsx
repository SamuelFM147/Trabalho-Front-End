// Importa as bibliotecas e componentes necessários do React e React Native.
import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';

// Define a "interface" para as propriedades (props) que o componente espera receber.
// Isso ajuda a garantir que estamos usando o componente corretamente, com os tipos de dados certos.
interface EndGameScreenProps {
  message: string;      // A mensagem de vitória ou derrota a ser exibida.
  onRestart: () => void; // A função a ser chamada quando o usuário tocar na tela para reiniciar.
  isVictory: boolean;   // Um booleano que indica se é uma tela de vitória ou derrota.
}

// Declaração do componente funcional 'EndGameScreen'.
// Ele recebe as props 'message', 'onRestart' e 'isVictory'.
const EndGameScreen: React.FC<EndGameScreenProps> = ({ message, onRestart, isVictory }) => {
  
  // 'useRef' é usado para armazenar o valor da animação.
  // Usamos useRef em vez de useState para que o valor persista entre as renderizações
  // sem fazer o componente renderizar novamente toda vez que a animação muda.
  // .current acessa o valor real armazenado pelo ref.
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const statusFadeAnim = useRef(new Animated.Value(1)).current;

  // 'useEffect' é usado para lidar com "efeitos colaterais", como iniciar animações.
  // O array vazio `[]` no final significa que este efeito será executado apenas uma vez,
  // quando o componente for "montado" (aparecer na tela).
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

    const statusBlinkAnimation = Animated.sequence([
      Animated.timing(statusFadeAnim, {
        toValue: 0.3,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(statusFadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]);

    const loop = Animated.loop(blinkAnimation);
    const statusLoop = Animated.loop(statusBlinkAnimation);
    
    loop.start();
    statusLoop.start();

    return () => {
      loop.stop();
      statusLoop.stop();
    };
  }, [fadeAnim, statusFadeAnim]);

  // O JSX que define a aparência do componente.
  return (
    // 'TouchableOpacity' é um container que responde a toques, tornando a tela inteira clicável.
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9} // Controla a opacidade ao tocar.
      onPress={onRestart}   // Chama a função onRestart ao ser tocado.
    >
      <View style={styles.content}>
        {/* Exibe o status de "Vitória!" ou "Você Morreu!" com estilo condicional. */}
        <Animated.View style={{ opacity: statusFadeAnim }}>
          <Text style={[
            styles.statusText,
            isVictory ? styles.victoryStatus : styles.defeatStatus // Aplica estilo de vitória ou derrota.
          ]}>
            {isVictory ? "Vitória!" : "Sua jornada acabou!"}
          </Text>
        </Animated.View>
        
        {/* Exibe a imagem do logo. */}
        <Image
          source={require('src/assets/SinLogo.png')}
          style={styles.logo}
          resizeMode="contain" // Garante que a imagem se ajuste sem distorcer.
        />
        
        {/* Exibe a mensagem principal. */}
        <Text style={[
          styles.message,
          isVictory ? styles.victoryMessage : styles.defeatMessage
        ]}>{message}</Text>
        
        {/* Container para o texto do botão. */}
        <View style={styles.buttonContainer}>
          {/* 'Animated.View' é um componente que pode ser animado.
              Sua opacidade está ligada ao nosso valor 'fadeAnim'. */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={[
              styles.buttonText,
              isVictory ? styles.victoryButton : styles.defeatButton
            ]}>
              {isVictory ? "Jogar Novamente" : "Tentar Novamente?"}
            </Text>
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 'StyleSheet.create' otimiza os estilos, enviando-os para a parte nativa apenas uma vez.
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
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'FonteHome',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  victoryMessage: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  defeatMessage: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'FonteHome',
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  victoryButton: {
    color: '#00FF00',
    textShadowColor: 'rgba(0, 255, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  defeatButton: {
    color: '#FF0000',
    textShadowColor: 'rgba(255, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'FonteHome',
    marginBottom: 20,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  victoryStatus: {
    color: '#00FF00',
    textShadowColor: 'rgba(0, 255, 0, 0.5)',
  },
  defeatStatus: {
    color: '#FF0000',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
  },
});

// Exporta o componente para que ele possa ser usado em outras partes do aplicativo.
export default EndGameScreen;