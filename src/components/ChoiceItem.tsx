import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

interface ChoiceItemProps {
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ label, onPress, isLast }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.container,
      pressed && styles.pressed,
      isLast && styles.last,
    ]}
  >
    <Text style={styles.text}>{label}</Text>
    {!isLast && <View style={styles.divider} />}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.choiceBackground,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    backgroundColor: colors.choiceHighlight,
  },
  text: {
    color: colors.choiceText,
    fontSize: 16,
  },
  divider: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    height: 1,
    backgroundColor: colors.divider,
    opacity: 0.7,
  },
  last: {
    borderBottomWidth: 0,
  },
});

export default ChoiceItem; 