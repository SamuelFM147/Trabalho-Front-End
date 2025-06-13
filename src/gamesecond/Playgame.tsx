import React, { useRef, useState, useEffect } from 'react';
import {View,Text,Image,Animated,PanResponder,Dimensions, ImageBackground,Modal, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './stylePlay';
import { getRandomEscolha, Escolha, escolhas } from '../escolhas/escolhas2';
import NavigationControls from '../components/NavigationControls';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  EndGame: {
    diasVigilia: number;
    salvos: number;
    sacrificados: number;
  };
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 80;

// Função para carregar todas as imagens disponíveis
const loadImages = () => {
  const images: { [key: string]: any } = {};
  
  // Tenta carregar todas as imagens possíveis
  const possibleImages = {
    // Imagens do id301 ao id325
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
    'id321.png': require('../assets/id321.png'),
    'id322.png': require('../assets/id322.png'),
    'id323.png': require('../assets/id323.png'),
    'id324.png': require('../assets/id324.png'),
    'id325.png': require('../assets/id325.png'),
    // Imagens padrão
    'SinIcon.png': require('../assets/SinIcon.png'),
    'SinFundo.png': require('../assets/SinFundo.png'),
    'SinLogo.png': require('../assets/SinLogo.png'),
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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentEscolha, setCurrentEscolha] = useState<Escolha | null>(null);
  const [cardLabel, setCardLabel] = useState('Qual a sua resposta?');
  const [cardColor, setCardColor] = useState('white');
  const [modalVisible, setModalVisible] = useState(false);
  const [consequenceText, setConsequenceText] = useState('');
  const [sanityLevel, setSanityLevel] = useState(100);
  const [savedCount, setSavedCount] = useState(0);
  const [sacrificedCount, setSacrificedCount] = useState(2);
  const [numeroJogadas, setNumeroJogadas] = useState(0);
  const [escolhasApresentadas, setEscolhasApresentadas] = useState<string[]>([]);
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const currentEscolhaRef = useRef<Escolha | null>(null);

  const resetGame = () => {
    setCardLabel('Qual a sua resposta?');
    setCardColor('white');
    setModalVisible(false);
    setConsequenceText('');
    setSanityLevel(100);
    setSavedCount(0);
    setSacrificedCount(2);
    setNumeroJogadas(0);
    setEscolhasApresentadas([]);
    modalOpacity.setValue(0);
    pan.setValue({ x: 0, y: 0 });
    
    const initialChoice = getRandomEscolha();
    setCurrentEscolha(initialChoice);
    currentEscolhaRef.current = initialChoice;
    setEscolhasApresentadas([initialChoice.id]);
  };

  // Efeito para reiniciar o jogo quando o componente é montado
  useEffect(() => {
    resetGame();
    
    // Adiciona um listener para a focagem da tela
    const unsubscribe = navigation.addListener('focus', () => {
      resetGame();
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    if (currentEscolha) {
      currentEscolhaRef.current = currentEscolha;
    }
  }, [currentEscolha]);

  useEffect(() => {
    if (sanityLevel <= 0) {
      navigation.navigate('EndGame', {
        diasVigilia: numeroJogadas,
        salvos: savedCount,
        sacrificados: sacrificedCount
      });
    }
  }, [sanityLevel, navigation, numeroJogadas, savedCount, sacrificedCount]);

  const loadNewChoice = () => {
    let newEscolha;
    let tentativas = 0;
    const maxTentativas = escolhas.length * 2; // Evita loop infinito

    // Se todas as escolhas já foram apresentadas, reinicia a lista
    if (escolhasApresentadas.length >= escolhas.length) {
      setEscolhasApresentadas([]);
    }

    do {
      newEscolha = getRandomEscolha();
      tentativas++;
      // Continua procurando se a escolha já foi apresentada e ainda há outras opções
    } while (
      escolhasApresentadas.includes(newEscolha.id) && 
      tentativas < maxTentativas &&
      escolhasApresentadas.length < escolhas.length
    );
    
    setCurrentEscolha(newEscolha);
    currentEscolhaRef.current = newEscolha;
    setEscolhasApresentadas(prev => [...prev, newEscolha.id]);
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
    setNumeroJogadas(prev => prev + 1);

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
    }, 3000);
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
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#000000', '#0b0f1a', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      >
        <ImageBackground
          source={require('../assets/SinFundo.png')}
          style={styles.container}
        >
          <View style={styles.contentContainer}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              {/* BLOCO SUPERIOR */}
              <View>
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
              </View>
  
              {/* FOOTER FIXO */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Espírito do Esquecido</Text>
                <Text style={styles.footerSmall}>Sin</Text>
                <Text style={styles.footerSmall}>{numeroJogadas} dias em vigília</Text>
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
          </View>
        </ImageBackground>
  
        {/* MODAL */}
        <Modal transparent visible={modalVisible} animationType="none">
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { opacity: modalOpacity }]}>
              <Text style={styles.modalText}>{consequenceText}</Text>
            </Animated.View>
          </View>
        </Modal>
  
        <NavigationControls />
      </LinearGradient>
    </View>
  );  
}

