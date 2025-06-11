import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  containerDoConteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImagem: {
    width: width,
    height: height * 0.4,
    marginBottom: height * 0.2,
  },

  containerDoBotao: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  Textobotao: {
    color: '#fff',
    fontSize: 30,
    letterSpacing: 1.6,
    textAlign: 'center',
    fontFamily: 'FonteHome',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
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
});
