
import { StyleSheet } from "react-native"; 

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