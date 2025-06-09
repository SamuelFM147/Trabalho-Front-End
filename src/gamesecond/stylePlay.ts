import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statusBox: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sanityBar: {
    flexDirection: 'row',
    gap: 4,
  },
  sanityUnit: {
    width: 15,
    height: 15,
    backgroundColor: '#b3261e',
    borderRadius: 2,
  },
  questionText: {
    color: '#eaeaea',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    alignSelf: 'center',
    backgroundColor: 'rgba(27, 27, 27, 0.8)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.5,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  cardImage: {
    width: width * 0.65,
    height: width * 0.65,
    marginBottom: 30,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'rgba(27, 27, 27, 0.6)',
    padding: 15,
    borderRadius: 10,
    width: width * 0.85,
    alignSelf: 'center',
  },
  footerText: {
    color: '#ccc',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 5,
  },
  footerSmall: {
    color: '#777',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    gap: 20,
  },
  
  statBox: {
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  statLabel: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  consequenceText: {
    color: '#aa3333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  
  modalContent: {
    backgroundColor: '#1c1c1c',
    padding: 30,
    borderRadius: 12,
    borderColor: '#aa3333',
    borderWidth: 2,
    maxWidth: '85%',
  },
  
  modalText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
});
