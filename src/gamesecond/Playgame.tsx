import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { styles } from './stylePlay';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

export default function SinIntroScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [cardColor, setCardColor] = useState<'white' | 'green' | 'red'>('white');
  const [cardLabel, setCardLabel] = useState('Qual a sua resposta?');

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });

        if (gesture.dx > 20) {
          setCardLabel('SIM');
          setCardColor('green');
        } else if (gesture.dx < -20) {
          setCardLabel('NÃO');
          setCardColor('red');
        } else {
          setCardLabel('Qual a sua resposta?');
          setCardColor('white');
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            console.log('➡️ Escolheu SIM');
            pan.setValue({ x: 0, y: 0 });
            setCardColor('white');
            setCardLabel('Qual a sua resposta?');
          });
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            console.log('⬅️ Escolheu NÃO');
            pan.setValue({ x: 0, y: 0 });
            setCardColor('white');
            setCardLabel('Qual a sua resposta?');
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            setCardColor('white');
            setCardLabel('Qual a sua resposta?');
          });
        }
      },
    })
  ).current;

  return (
    <ImageBackground
      source={require('../assets/SinFundo.png')}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
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

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [...pan.getTranslateTransform(), { rotate }],
            },
          ]}
        >
          <Image
            source={require('../assets/SinIcon.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={[styles.cardTitle, { color: cardColor }]}>{cardLabel}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Espírito do Esquecido</Text>
          <Text style={styles.footerSmall}>Sin</Text>
          <Text style={styles.footerSmall}>0 dias em vigília</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
