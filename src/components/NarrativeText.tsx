import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

interface NarrativeTextProps {
  text: string;
}

const NarrativeText: React.FC<NarrativeTextProps> = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
  },
});

export default NarrativeText; 