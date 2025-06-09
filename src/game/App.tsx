import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Home from '../home'; 
import Game from './AppGame';
import PlayGame from '../gamesecond/Playgame';
import { AudioProvider } from '../songGame/AudioContext';
// import { SafeAreaProvider } from 'react-native-safe-area-context'; // Descomente se usar

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({ //porcaria de fonte que ta aqui e se tirar crasha
    'FonteHome': require('../assets/Fonts/teste.ttf'), //não deveria estar aqui, e nem sei o pq diabos mas se mudar para o style ele não funciona e crasha
  });

  if (!fontsLoaded) {
    return null; // EXTREMAMENTE IMPORTANTE NÃO APAGAR
  }

  return (
    <NavigationContainer>
      <AudioProvider>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="PlayGame" component={PlayGame} />
        </Stack.Navigator>
      </AudioProvider>
    </NavigationContainer>
  );
}