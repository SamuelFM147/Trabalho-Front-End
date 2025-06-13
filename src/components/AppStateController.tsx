import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAudio } from './AudioSystem';

interface AppStateControllerProps {
  children: React.ReactNode;
}
const AppStateController: React.FC<AppStateControllerProps> = ({ children }) => {
  const { pauseSound, resumeSound } = useAudio();
  useEffect(() => {
    let currentAppState = AppState.currentState;
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log('AppStateController: State changed from', currentAppState, 'to', nextAppState);
      if (currentAppState === 'active' && (nextAppState === 'background' || nextAppState === 'inactive')) {
        await pauseSound();
      } else if ((currentAppState === 'background' || currentAppState === 'inactive') && nextAppState === 'active') {
        await resumeSound();
      }
      currentAppState = nextAppState;
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription?.remove();
    };
  }, [pauseSound, resumeSound]);
  return <>{children}</>;
};
export default AppStateController;
