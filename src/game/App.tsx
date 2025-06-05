import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Home from '../home'; 
import Game from './AppGame'; 

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'FonteHome': require('../assets/Fonts/teste.ttf'),
  });

  if (!fontsLoaded) {
    return null; // EXTREMAMENTE IMPORTANTE NÃO APAGAR
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