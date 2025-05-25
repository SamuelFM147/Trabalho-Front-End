import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handleButtonPress = (option: string) => {
    // Aqui você pode adicionar a lógica para cada opção
    Alert.alert(`Você escolheu a opção ${option}`);
  };

  return (
    <View style={styles.container}>
      {/* Fala em pergaminho */}
      <ScrollView style={styles.scrollContainer}>

        <Text style={styles.scrollText}>
          “Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
        </Text> 

        <Image
        source={require('./assets/SinSplash.png')}
        style={styles.imagemTexto}
        />
         <Text style={styles.scrollText}>
          “Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
        </Text> 
        <Image
        source={require('./assets/SinSplash.png')}
        style={styles.imagemTexto}
        />
         <Text style={styles.scrollText}>
          “Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
        </Text> 

      </ScrollView>  
      {/* trocado o View  e adicionado o ScrollView para permitir rolagem do texto, entao todos os texto devem estar dentro do Scrollview */}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb3', // cor de fundo
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: '#f5deb3', // cor de pergaminho
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
    gap: 10,    // se não funcionar, pode usar marginVertical nos botões
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

  imagemTexto: {        //aqui é apenas um exemplo de imagem, para ficar visivel, usar apenas de base
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
