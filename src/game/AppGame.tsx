import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import GameScreen from '../screens/GameScreen';
import NavigationControls from '../components/NavigationControls';
import { colors } from '../game/styles';

const AppGame: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background} 
        translucent={true}
      />
      <GameScreen />
      <NavigationControls />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default AppGame;