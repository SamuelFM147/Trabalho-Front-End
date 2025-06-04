
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

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
    minHeight: 200,
  },
  narrativeText: {
    ...typography.narrativeText,
  },

  sceneImage: {
    width: width - 30,
    height: (width - 30) * 0.6,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  sceneIdContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.pergaminhoBorder,
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
    backgroundColor: colors.background,
  },
  endGameText: {
    fontSize: 24,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  restartButton: {
    backgroundColor: colors.buttonBorder,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  restartButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});