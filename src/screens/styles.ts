import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../game/styles';
import { typography } from '../game/styles';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  narrativeContainer: {
    backgroundColor: colors.pergaminhoBg,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 192, 104, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 200,
  },
  narrativeText: {
    ...typography.narrativeText,
  },

  sceneImage: {
    width: width - 30,
    height: (width - 30) * 0.75,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(230, 192, 104, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  sceneIdContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(230, 192, 104, 0.2)',
  },
  sceneIdText: {
    ...typography.sceneIdText,
  },
  choicesContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
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
    flexDirection: 'row',
    minHeight: 50,
  },
  choiceButtonText: {
    ...typography.choiceButtonText,
    marginLeft: 10,
    flexShrink: 1,
    textAlign: 'center',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: colors.buttonText,
    fontSize: 18,
  },

  choiceButtonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  endGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  endGameText: {
    fontSize: 32,
    color: '#FF0000',
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