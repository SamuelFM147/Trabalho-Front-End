import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from './stylePlay';

const { width } = Dimensions.get('window');

export default function SinIntroScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Sanidade</Text>
          <View style={styles.sanityBar}>
            <View style={styles.sanityUnit} />
            <View style={styles.sanityUnit} />
            <View style={styles.sanityUnit} />
          </View>
        </View>
      </View>

      <Text style={styles.questionText}>Você é o novo Vigia?</Text>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/SinIcon.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.cardTitle}>Sim</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Espírito do Esquecido</Text>
        <Text style={styles.footerSmall}>Sin</Text>
        <Text style={styles.footerSmall}>0 dias em vigília</Text>
      </View>
    </View>
  );
}
