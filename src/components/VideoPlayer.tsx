import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useAudio } from '../components/AudioSystem';

interface VideoPlayerProps {
  onSkip: () => void;
  onComplete: () => void;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ onSkip, onComplete }) => {
  const videoRef = useRef<Video>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { stopSound } = useAudio();
  useEffect(() => {
    const setupAudio = async () => {
      await stopSound();
    };
    setupAudio();
    // Não retomamos a música aqui, deixamos isso para o GameScreen
    return () => {};
  }, [stopSound]);
  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      onComplete();
    }
  };
  const handleSkip = () => {
    onSkip();
  };
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/videos/id300.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'FonteHome',
  },
});
export default VideoPlayer; 