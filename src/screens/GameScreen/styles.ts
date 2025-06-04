// --- INÍCIO DO ARQUIVO: src/screens/GameScreen/styles.ts ---
import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },
  // Estilos para NarrativeDisplay
  narrativeContainer: {
    backgroundColor: colors.pergaminhoBg,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.pergaminhoBorder,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 200, // Para dar espaço ao texto
  },
  narrativeText: {
    ...typography.narrativeText,
  },
  sceneImage: {
    width: '100%',
    height: 150, // Ajuste conforme necessário
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 5,
  },
  // Estilos para SceneIdDisplay
  sceneIdContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.pergaminhoBorder, // Linha separadora como no protótipo
  },
  sceneIdText: {
    ...typography.sceneIdText,
  },
  // Estilos para ChoiceButton
  choicesContainer: {
    marginTop: 'auto', // Empurra os botões para baixo
    paddingBottom: 20, // Espaço na parte inferior
  },
  choiceButton: {
    backgroundColor: colors.buttonBg,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    flexDirection: 'row', // Para ícone e texto
    minHeight: 50,
  },
  choiceButtonText: {
    ...typography.choiceButtonText,
    marginLeft: 10, // Espaço entre ícone e texto
    flexShrink: 1, // Permite que o texto quebre se for muito longo
    textAlign: 'center',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    // No futuro, você pode usar um componente <Icon /> aqui
    // Por agora, vamos simular com uma cor de fundo ou texto
    // backgroundColor: colors.buttonText, // Exemplo
  },
  iconText: {
    color: colors.buttonText,
    fontSize: 18,
  },
   // Estilos para tela de Fim de Jogo / Vitória
  endGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000', // Fundo preto
  },
  endGameText: {
    fontSize: 32,
    color: '#FF0000', // Texto vermelho
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  restartButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  restartButtonText: {
    color: '#FF0000',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
// --- FIM DO ARQUIVO: src/screens/GameScreen/styles.ts ---