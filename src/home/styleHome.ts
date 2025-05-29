import { StyleSheet } from "react-native"; 

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0e0d0d',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
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
      backgroundColor: '#3c2f2f',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#a88e56',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
    buttonText: {
      color: '#f5e6c5',
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 1,
    },
  });