import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles"

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
          "Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
        </Text> 

        <Image
        source={require('../assets/SinSplash.png')}
        style={styles.imagemTexto}
        />
         <Text style={styles.scrollText}>
          "Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
        </Text> 
        <Image
        source={require('../assets/SinSplash.png')}
        style={styles.imagemTexto}
        />
         <Text style={styles.scrollText}>
          "Saudações, aventureiro... Escolha sabiamente o seu caminho!" 
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
