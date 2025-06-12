import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    paddingTop: 80,
    paddingBottom: 100, 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
    fontFamily: 'serif', 
  },
  creditItem: {
    marginBottom: 25,
    alignItems: 'center',
  },
  role: {
    fontSize: 22,
    color: '#aaa',
    fontFamily: 'serif',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'serif',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 