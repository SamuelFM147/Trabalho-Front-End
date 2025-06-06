
import { StyleSheet } from "react-native"; 
import { TextStyle } from 'react-native';

// Tema místico e sombrio com detalhes dourados
export const colors = {
  background: '#0A0F14', // Fundo muito escuro com tom azulado
  text: '#E6C068', // Dourado suave para texto
  divider: '#2A333C', // Divisor escuro com tom azulado
  choiceBackground: '#1A1E23', // Fundo escuro para escolhas
  choiceHighlight: '#2C3238', // Destaque suave para hover
  choiceText: '#E6C068', // Dourado suave para texto das escolhas
  pergaminhoBg: '#0F1419', // Fundo escuro para o pergaminho
  pergaminhoBorder: '#2A333C', // Borda do pergaminho
  textPrimary: '#E6C068', // Texto principal em dourado
  textLight: '#BFA75F', // Dourado mais claro
  buttonBg: '#1A1E23', // Fundo escuro para botões
  buttonBorder: '#3A424C', // Borda sutil para botões
  buttonText: '#E6C068', // Texto dos botões em dourado
  sceneIdColor: '#BFA75F', // ID da cena em dourado mais claro
  white: '#FFFFFF',
  black: '#000000',
  disabledButtonBg: '#1C2126',
};

export const typography = {
  narrativeText: {
    fontSize: 20,
    fontFamily: 'serif',
    lineHeight: 32,
    color: colors.textPrimary,
    textAlign: 'center',
    textShadowColor: 'rgba(230, 192, 104, 0.3)', // Sombra dourada suave
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  } as TextStyle,
  choiceButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: colors.buttonText,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
  sceneIdText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: colors.sceneIdColor,
    textShadowColor: 'rgba(230, 192, 104, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  } as TextStyle,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb3',
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: '#f5deb3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 28,
  },
  scrollText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#3e2c1c',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginBottom: 50,
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8b5a2b',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f5deb3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagemTexto: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    width: 200,
    height: 260,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});