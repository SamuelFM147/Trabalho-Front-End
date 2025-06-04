import { TextStyle } from 'react-native';
import { colors } from './colors';

// Se você adicionar uma fonte customizada, descomente e configure no expo.
// export const customFontFamily = 'MedievalSharp-Regular';

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
  // Adicione mais estilos de texto conforme necessário
};
