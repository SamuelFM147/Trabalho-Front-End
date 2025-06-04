import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  telaInteiraPreta: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImagem: {
    width: width * 1,
    height: height * 0.4,
    marginBottom: height * 0.2,
  },

  containerDoBotao: {
    alignItems: 'center',
    justifyContent: 'center',
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

  //NAO USAR FONTSTYLE se nao quebra a fontFamily 
  Textobotao: {
    color: '#fff',
    fontSize: 30,
    letterSpacing: 1.6,
    textAlign: 'center',
    fontFamily: 'FonteHome', //essa fonte esta sendo puxada no App.tsx
  },
});