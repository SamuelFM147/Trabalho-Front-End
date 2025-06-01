import { StyleSheet, Dimensions } from "react-native"; 

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    background: {
  flex: 1,
  width: width * 0.5, // 80% da largura da tela
  height: height * 0.2, // 80% da altura da tela
  alignSelf: 'center',
  resizeMode: 'contain',
  marginTop: height * 0.0, // Centraliza verticalmente
  marginBottom: height * 0.1, // Espaço abaixo do logo
  backgroundColor: 'rgb(10, 10, 10)', // Fundo semitransparente
},
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 80,
    },
    title: {
      fontSize: 36,
      color: '#e2d4a0',
      fontWeight: 'bold',
      marginBottom: 60,
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 6,
      fontFamily: 'serif', 
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingVertical: 16,
      paddingHorizontal: 60,
      borderRadius: 10,
      marginBottom: 40,
    },
    buttonText: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
});