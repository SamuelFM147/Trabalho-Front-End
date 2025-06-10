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
const SWIPE_THRESHOLD = 80; // Reduzido de 120 para 80 para facilitar o swipe

export default function SinIntroScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [cardColor, setCardColor] = useState<'white' | 'green' | 'red'>('white');
  const [cardLabel, setCardLabel] = useState('Qual a sua resposta?');
  const [savedCount, setSavedCount] = useState(12);
  const [sacrificedCount, setSacrificedCount] = useState(3);
  const [currentEscolha, setCurrentEscolha] = useState<Escolha | null>(null);
  
  // Usar useRef para manter uma referência estável
  const currentEscolhaRef = useRef<Escolha | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [consequenceText, setConsequenceText] = useState('');
  const modalOpacity = useRef(new Animated.Value(0)).current;  // Carregar uma escolha aleatória ao montar o componente
  useEffect(() => {
    const initialChoice = getRandomEscolha();
    setCurrentEscolha(initialChoice);
    currentEscolhaRef.current = initialChoice;
  }, []);

  // Sincronizar ref com state quando currentEscolha muda
  useEffect(() => {
    if (currentEscolha) {
      currentEscolhaRef.current = currentEscolha;
    }
  }, [currentEscolha]);  // Função para carregar nova escolha aleatória
  const loadNewChoice = () => {
    // Garantir que obtemos uma escolha diferente da atual
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
  });  const showConsequenceModal = (label: string) => {
    // Tentar pegar a escolha de qualquer fonte disponível
    let escolhaParaUsar = currentEscolhaRef.current || currentEscolha;
    
    if (!escolhaParaUsar) {
      // Criar nova escolha imediatamente
      escolhaParaUsar = getRandomEscolha();
      
      // Atualizar tanto state quanto ref
      setCurrentEscolha(escolhaParaUsar);
      currentEscolhaRef.current = escolhaParaUsar;
    }
    
    // CORREÇÃO: Normalizar o label para corresponder às chaves do objeto
    const normalizedLabel = label === 'NÃO' ? 'NAO' : label; // Converter NÃO para NAO
    
    const escolhaData = escolhaParaUsar.escolhas[normalizedLabel as 'SIM' | 'NAO'];
    
    if (!escolhaData) {
      return;
    }
    
    // Atualizar contadores baseado na escolha
    setSavedCount(prev => prev + escolhaData.salvos);
    setSacrificedCount(prev => prev + escolhaData.sacrificados);

    setConsequenceText(escolhaData.consequencia);
    setModalVisible(true);

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
      onStartShouldSetPanResponder: () => true,      onPanResponderMove: (_, gesture) => {
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
      },      onPanResponderRelease: (_, gesture) => {
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
      <View style={styles.contentContainer}>        <View style={styles.statusBar}>
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Sanidade</Text>
            <View style={styles.sanityBar}>
              <View style={styles.sanityUnit} />
              <View style={styles.sanityUnit} />
              <View style={styles.sanityUnit} />
            </View>
          </View>
        </View>        <Text style={styles.questionText} key={currentEscolha?.id || 'loading'}>
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
          <Text style={[styles.cardTitle, { color: cardColor }]}>{cardLabel || 'Qual a sua resposta?'}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Espírito do Esquecido</Text>
          <Text style={styles.footerSmall}>Sin</Text>
          <Text style={styles.footerSmall}>0 dias em vigília</Text>          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: 'green' }]}>{savedCount || 0}</Text>
              <Text style={styles.statLabel}>Pessoas salvas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: 'red' }]}>{sacrificedCount || 0}</Text>
              <Text style={styles.statLabel}>Pessoas sacrificadas</Text>
            </View>
          </View>
        </View>
      </View>      {/* Modal de Zombaria */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { opacity: modalOpacity }]}>
            <Text style={styles.modalText}>{consequenceText || ''}</Text>
          </Animated.View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

