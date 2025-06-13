import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../game/styles';

interface SceneDividerProps {
  sceneNumber: string | number;
}
const SceneDivider: React.FC<SceneDividerProps> = ({ sceneNumber }) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.number}>{sceneNumber}</Text>
    <View style={styles.line} />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  number: {
    marginHorizontal: 12,
    color: colors.text,
    fontSize: 15,
    opacity: 0.7,
  },
});
export default SceneDivider; 