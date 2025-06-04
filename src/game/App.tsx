import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Home from '../home'; 
import Game from './AppGame'; 
import { Text, View } from 'react-native'; 

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'FonteHome': require('../assets/Fonts/teste.ttf'),
  });

  console.log('Fontes carregadas:', fontsLoaded, 'Erro na fonte:', fontError);

  if (fontError) {
    return <Text>Erro ao carregar fonte: {fontError.message}</Text>;
  }

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}