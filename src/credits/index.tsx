import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './style';

const creditsData = [
  {
    role: 'Desenvolvedor, motomoto e edukof: ',
    name: 'Nicolas Kauan Vieira Da Silva',
    linkedin: 'https://www.linkedin.com/in/nicolas-kauan-vieira-da-silva/', 
  },
  {
    role: 'Desenvolvedor: ',
    name: 'Baruch',
    linkedin: 'https://www.linkedin.com/in/bossobaruch/',
  },
  {
    role: 'Desenvolvedor: ',
    name: 'João Gabriel Milaré',
    linkedin: 'https://www.linkedin.com/in/joaogabriel-milar%C3%A9/',
  },
  {
    role: 'Desenvolvedor: ',
    name: 'Lucas dos Anjos Linhares',
    linkedin: 'https://www.linkedin.com/in/lucas-dos-anjos-linhares-aa49a5357/',
  },
  {
    role: 'Desenvolvedor: ',
    name: 'Samuel Fuentes Michels',
    linkedin: 'https://www.linkedin.com/in/samuel-fuentes-michels-87a547279/',
  },
  {
    role: 'Desenvolvedor: ',
    name: 'Vinícius Ramon Ferreira',
    linkedin: 'https://www.linkedin.com/in/vin%C3%ADciusrferreira/',
  },
];

export default function Credits() {
  const navigation = useNavigation<any>();

  const handlePressLinkedIn = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Erro ao abrir o LinkedIn:", err));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0b0f1a', '#1a1a1a']}
        style={styles.gradient}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Créditos</Text>
        {creditsData.map((credit, index) => (
          <View key={index} style={styles.creditItem}>
            <Text style={styles.role}>{credit.role}</Text>
            <TouchableOpacity onPress={() => handlePressLinkedIn(credit.linkedin)}>
              <Text style={[styles.name, { textDecorationLine: 'underline', color: '#4da6ff' }]}>
                {credit.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
