import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import AppStateController from '../components/AppStateController';
import Home from '../home'; 
import Game from './AppGame';
import PlayGame from '../gamesecond/Playgame';
import EndGame from '../screens/EndGame';
import Credits from '../credits';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({ //porcaria de fonte que ta aqui e se tirar crasha
    'FonteHome': require('../assets/Fonts/teste.ttf'), //não deveria estar aqui, e nem sei o pq diabos mas se mudar para o style ele não funciona e crasha
  });
  if (!fontsLoaded) {
    return null; // EXTREMAMENTE IMPORTANTE NÃO APAGAR
  }
  return (
    <AppStateController>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="PlayGame" component={PlayGame} />
          <Stack.Screen name="EndGame" component={EndGame} />
          <Stack.Screen name="Credits" component={Credits} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateController>
  );
}