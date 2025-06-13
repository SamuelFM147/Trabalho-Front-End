import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface ExpandableButtonProps {
  onMenuPress: () => void;
  onMutePress: () => void;
  isMuted: boolean;
}
const ExpandableButton: React.FC<ExpandableButtonProps> = ({
  onMenuPress,
  onMutePress,
  isMuted
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: false,
      friction: 6,
      tension: 40
    }).start();
    setIsExpanded(!isExpanded);
  };
  const containerHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 100]
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, { height: containerHeight }]}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={toggleExpand}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isExpanded ? "close-outline" : "menu-outline"} 
            size={16} 
            color="#FFF" 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={onMenuPress}
              activeOpacity={0.8}
            >
              <Ionicons name="home-outline" size={14} color="#FFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={onMutePress}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={isMuted ? "volume-mute-outline" : "volume-high-outline"} 
                size={14} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 9999,
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: '#2E2E2E',
    borderRadius: 15,
    width: 30,
    alignItems: 'center',
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 6,
    alignItems: 'center',
    gap: 6,
  },
  optionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ExpandableButton; 