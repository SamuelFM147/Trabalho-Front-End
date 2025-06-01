import { StyleSheet, Dimensions } from "react-native"; 

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 80,
    },
    title: {
      fontSize: 36,
      color: '#e2d4a0',
      fontWeight: 'bold',
      marginBottom: 60,
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 6,
      fontFamily: 'serif', 
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingVertical: 16,
      paddingHorizontal: 60,
      borderRadius: 10,
      marginBottom: 40,
    },
    buttonText: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });