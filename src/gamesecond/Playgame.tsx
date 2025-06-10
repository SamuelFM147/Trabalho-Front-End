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

// Função para carregar todas as imagens disponíveis
const loadImages = () => {
  const images: { [key: string]: any } = {};
  
  // Tenta carregar todas as imagens possíveis
  const possibleImages = {
    // Imagens do id301 ao id320
    'id301.png': require('../assets/id301.png'),
    'id302.png': require('../assets/id302.png'),
    'id303.png': require('../assets/id303.png'),
    'id304.png': require('../assets/id304.png'),
    'id305.png': require('../assets/id305.png'),
    'id306.png': require('../assets/id306.png'),
    'id307.png': require('../assets/id307.png'),
    'id308.png': require('../assets/id308.png'),
    'id309.png': require('../assets/id309.png'),
    'id310.png': require('../assets/id310.png'),
    'id311.png': require('../assets/id311.png'),
    'id312.png': require('../assets/id312.png'),
    'id313.png': require('../assets/id313.png'),
    'id314.png': require('../assets/id314.png'),
    'id315.png': require('../assets/id315.png'),
    'id316.png': require('../assets/id316.png'),
    'id317.png': require('../assets/id317.png'),
    'id318.png': require('../assets/id318.png'),
    'id319.png': require('../assets/id319.png'),
    'id320.png': require('../assets/id320.png'),
    // Imagens padrão
    'SinIcon.png': require('../assets/SinIcon.png'),
    'SinFundo.png': require('../assets/SinFundo.png'),
    'SinLogo.png': require('../assets/SinLogo.png'),
    // Mapeamento alternativo para imagens com nomes diferentes
    'peste_poema.png': require('../assets/id309.png'), // Usando id309 como alternativa para peste_poema
  };

  // Adiciona todas as imagens disponíveis ao mapeamento
  Object.entries(possibleImages).forEach(([key, value]) => {
    try {
      images[key] = value;
    } catch (e) {
      console.warn(`Imagem ${key} não encontrada, usando imagem padrão`);
      images[key] = require('../assets/SinIcon.png'); // Fallback para imagem padrão
    }
  });

  return images;
};

// Carrega todas as imagens disponíveis
const imageMapping = loadImages();

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
    }, 2000);
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
            source={
              currentEscolha?.imagem && imageMapping[currentEscolha.imagem]
                ? imageMapping[currentEscolha.imagem]
                : imageMapping['SinIcon.png']
            }
            style={styles.cardImage}
            resizeMode="contain"
            onError={() => console.warn(`Erro ao carregar imagem: ${currentEscolha?.imagem}`)}
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

