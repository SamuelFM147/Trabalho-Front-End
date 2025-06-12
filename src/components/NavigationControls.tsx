import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './AudioSystem';
import ExpandableButton from './ExpandableButton';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  PlayGame: undefined;
};

const NavigationControls: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { toggleMute, isMuted, playMainTheme } = useAudio();

  useEffect(() => {
    // Garante que a música principal está tocando
    playMainTheme();
  }, []);

  const handleMenuPress = () => {
    navigation.navigate('Home');
  };

  return (
    <ExpandableButton
      onMenuPress={handleMenuPress}
      onMutePress={toggleMute}
      isMuted={isMuted}
    />
  );
};

export default NavigationControls; 