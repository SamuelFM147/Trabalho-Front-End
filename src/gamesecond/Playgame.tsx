import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
  Modal,
} from 'react-native';
import { styles } from './stylePlay';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

export default function SinIntroScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [cardColor, setCardColor] = useState<'white' | 'green' | 'red'>('white');
  const [cardLabel, setCardLabel] = useState('Qual a sua resposta?');
  const [savedCount, setSavedCount] = useState(12);
  const [sacrificedCount, setSacrificedCount] = useState(3);
  const [sanityLevel, setSanityLevel] = useState(100);

  const [modalVisible, setModalVisible] = useState(false);
  const [consequenceText, setConsequenceText] = useState('');
  const modalOpacity = useRef(new Animated.Value(0)).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });

  const updateSanity = (choice: 'SIM' | 'NÃO') => {
    if (choice === 'SIM') {
      setSanityLevel(prevSanity => Math.max(0, prevSanity - 5));
    }
  };

  const showConsequenceModal = (label: string) => {
    const simPhrases = [
      'Bravo. Um mártir a caminho do esquecimento.',
      'Vai carregar o mundo? Que nobre… que tolo.',
    ];
    const naoPhrases = [
      'Corajoso. Deixou o mundo apodrecer com dignidade.',
      'Sua fuga foi poética. Quase.',
    ];

    const text = label === 'SIM'
      ? simPhrases[Math.floor(Math.random() * simPhrases.length)]
      : naoPhrases[Math.floor(Math.random() * naoPhrases.length)];

    setConsequenceText(text);
    setModalVisible(true);
    updateSanity(label as 'SIM' | 'NÃO');

    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
        setCardColor('white');
        setCardLabel('Qual a sua resposta?');
      });
    }, 1500);
  };

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
            pan.setValue({ x: 0, y: 0 });
            showConsequenceModal('SIM');
          });
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            showConsequenceModal('NÃO');
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
            <Text style={styles.statusLabel}>Sanidade: {sanityLevel}%</Text>
            <View style={styles.sanityBar}>
              <View style={[styles.sanityUnit, { width: `${sanityLevel}%` }]} />
            </View>
          </View>
        </View>

        <Text style={styles.questionText}>Você é o novo Vigia?</Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            { transform: [...pan.getTranslateTransform(), { rotate }] },
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

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: 'green' }]}>{savedCount}</Text>
              <Text style={styles.statLabel}>Pessoas salvas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: 'red' }]}>{sacrificedCount}</Text>
              <Text style={styles.statLabel}>Pessoas sacrificadas</Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Animated.View 
          style={[
            styles.modalOverlay,
            { opacity: modalOpacity }
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{consequenceText}</Text>
          </View>
        </Animated.View>
      </Modal>
    </ImageBackground>
  );
}

