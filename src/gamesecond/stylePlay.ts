import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
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
  },
  card: {
    alignSelf: 'center',
    backgroundColor: '#1b1b1b',
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
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
  footerSmall: {
    color: '#777',
    fontSize: 12,
  },
});
