import React, { useRef, useState, useEffect } from 'react';
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
import { getRandomEscolha, Escolha, escolhas } from '../escolhas/escolhas2';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 80;

export default function SinIntroScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [cardColor, setCardColor] = useState<'white' | 'green' | 'red'>('white');
  const [cardLabel, setCardLabel] = useState('Qual a sua resposta?');
  const [savedCount, setSavedCount] = useState(12);
  const [sacrificedCount, setSacrificedCount] = useState(3);
  const [sanityLevel, setSanityLevel] = useState(100);
  const [currentEscolha, setCurrentEscolha] = useState<Escolha | null>(null);
  const currentEscolhaRef = useRef<Escolha | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [consequenceText, setConsequenceText] = useState('');
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initialChoice = getRandomEscolha();
    setCurrentEscolha(initialChoice);
    currentEscolhaRef.current = initialChoice;
  }, []);

  useEffect(() => {
    if (currentEscolha) {
      currentEscolhaRef.current = currentEscolha;
    }
  }, [currentEscolha]);

  const loadNewChoice = () => {
    let newEscolha;
    do {
      newEscolha = getRandomEscolha();
    } while (currentEscolhaRef.current && newEscolha.id === currentEscolhaRef.current.id && escolhas.length > 1);
    
    setCurrentEscolha(newEscolha);
    currentEscolhaRef.current = newEscolha;
  };

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
    let escolhaParaUsar = currentEscolhaRef.current || currentEscolha;
    
    if (!escolhaParaUsar) {
      escolhaParaUsar = getRandomEscolha();
      setCurrentEscolha(escolhaParaUsar);
      currentEscolhaRef.current = escolhaParaUsar;
    }
    
    const normalizedLabel = label === 'NÃO' ? 'NAO' : label;
    const escolhaData = escolhaParaUsar.escolhas[normalizedLabel as 'SIM' | 'NAO'];
    
    if (!escolhaData) {
      return;
    }
    
    setSavedCount(prev => prev + escolhaData.salvos);
    setSacrificedCount(prev => prev + escolhaData.sacrificados);
    setConsequenceText(escolhaData.consequencia);
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
        loadNewChoice();
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

        <Text style={styles.questionText} key={currentEscolha?.id || 'loading'}>
          {currentEscolha?.pergunta || 'Carregando...'}
        </Text>

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

      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { opacity: modalOpacity }]}>
            <Text style={styles.modalText}>{consequenceText}</Text>
          </Animated.View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

