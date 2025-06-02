
import { TextStyle } from 'react-native';
import { colors } from './colors';

// Se você adicionar uma fonte customizada, descomente e configure no expo.
// export const customFontFamily = 'MedievalSharp-Regular';

export const typography = {
  narrativeText: {
    fontSize: 17,
    // fontFamily: customFontFamily, // Descomente se usar fonte customizada
    lineHeight: 26,
    color: colors.textPrimary,
    textAlign: 'justify',
  } as TextStyle,
  choiceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.buttonText,
    // fontFamily: customFontFamily, // Pode usar a mesma ou uma mais legível
  } as TextStyle,
  sceneIdText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.sceneIdColor,
    // fontFamily: customFontFamily, // Pode usar a mesma ou uma mais impactante
  } as TextStyle,
  // Adicione mais estilos de texto conforme necessário
};
