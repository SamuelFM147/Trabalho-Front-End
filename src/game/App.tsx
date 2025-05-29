import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles"

export default function App() {
  const handleButtonPress = (option) => {
    Alert.alert(`Você escolheu a opção ${option}`);
  };

  return (
    <View style={styles.container}>
      {/* Fala em pergaminho */}
      <View style={styles.scrollContainer}>
        <Text style={styles.scrollText}>
          “Saudações, aventureiro... Escolha sabiamente o seu caminho!”
        </Text>
      </View>

      {/* Imagem central */}
      <Image
        source={require('./assets/SinSplash.png')} // ajuste o caminho conforme onde está sua imagem
        style={styles.characterImage}
      />

      {/* Botões estilizados */}
      <View style={styles.buttonsContainer}>
        {['Ataque', 'Defesa', 'Fugir', 'Negociar'].map((action, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#444' : '#333' }
            ]}
            onPress={() => handleButtonPress(action)}
          >
            <Text style={styles.buttonText}>{action}</Text>
          </Pressable>
        ))}
      </View>

      <StatusBar style="light" />
    </View>
  );
}
<<<<<<< Updated upstream:src/App.tsx

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: '#f5deb3', // cor de pergaminho
    borderWidth: 2,
    borderColor: '#8b5a2b',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  scrollText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#3e2c1c',
    textAlign: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#8b5a2b',
  },
  buttonsContainer: {
    marginBottom: 50,
    gap: 10, // se não funcionar, pode usar marginVertical nos botões
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
});
=======
>>>>>>> Stashed changes:src/game/App.tsx
