import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  statusBox: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  sanityBar: {
    flexDirection: 'row',
    gap: 4,
  },
  sanityUnit: {
    width: 12,
    height: 12,
    backgroundColor: '#b3261e',
    borderRadius: 2,
  },
  questionText: {
    color: '#eaeaea',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    alignSelf: 'center',
    backgroundColor: 'rgba(27, 27, 27, 0.8)',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
  },
  cardImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footerSmall: {
    color: '#777',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
