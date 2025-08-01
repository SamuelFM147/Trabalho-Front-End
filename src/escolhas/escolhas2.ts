export interface Escolha {
  id: string;
  pergunta: string;
  imagem: string;
  escolhas: {
    SIM: {
      consequencia: string;
      salvos: number;
      sacrificados: number;
    };
    NAO: {
      consequencia: string;
      salvos: number;
      sacrificados: number;
    };
  };
}

export const escolhas: Escolha[] = [
  {
    "id": "001",
    "pergunta": "As palavras fugiram do idioma. Você as captura?",
    "imagem": "id301.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Você as caçou. Mas elas agora te falam o tempo todo.",
        "salvos": 48,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "As palavras fugiram para sempre. Agora o mundo grita.",
        "salvos": 0,
        "sacrificados": 48
      }
    }
  },
  {
    "id": "002",
    "pergunta": "Um rato oferece um tratado de paz. Você assina?",
    "imagem": "id302.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele chorou. Paz foi assinada. E você virou embaixador das tocas.",
        "salvos": 0,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele se foi. Mas ratos agora murmuram seu nome.",
        "salvos": 0,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "003",
    "pergunta": "O mar recita seu nome em cada onda. Você mergulha?",
    "imagem": "id303.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Você afundou. E renasceu feito maré.",
        "salvos": 1500,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "O mar se calou. Mas nunca mais trouxe peixes.",
        "salvos": 0,
        "sacrificados": 1500
      }
    }
  },
  {
    "id": "004",
    "pergunta": "A lua está se aproximando lentamente. Você interfere?",
    "imagem": "id304.png",
    "escolhas": {
      "SIM": {
        "consequencia": "A lua respondeu. Com um beijo e um colapso gravitacional.",
        "salvos": 1550,
        "sacrificados": 84870
      },
      "NAO": {
        "consequencia": "A lua se calou. Mas levou o mar junto.",
        "salvos": 84870,
        "sacrificados": 1550
      }
    }
  },
  {
    "id": "005",
    "pergunta": "O demônio oferece poder infinito. Vai aceita?",
    "imagem": "id305.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O poder corrompe, mas às vezes é necessário.",
        "salvos": 10,
        "sacrificados": 8
      },
      "NAO": {
        "consequencia": "A pureza tem seu próprio tipo de força.",
        "salvos": 8,
        "sacrificados": 10
      }
    }
  },
  {
    "id": "006",
    "pergunta": "Sua filha aparece em sonhos. Vai segui-la?",
    "imagem": "id306.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Algumas ilusões são mais reais que a realidade.",
        "salvos": 0,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "Aceitar a perda é o primeiro passo para a redenção.",
        "salvos": 0,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "007",
    "pergunta": "Uma criança com olhos dourados diz ser seu avô. Você acredita?",
    "imagem": "id307.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele provou com uma canção esquecida. Você chorou.",
        "salvos": 1,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele chorou. E desapareceu com o tempo.",
        "salvos": 0,
        "sacrificados": 1
      }
    }
  },
  {
    "id": "008",
    "pergunta": "Um espelho começa a refletir o futuro de estranhos. Você olha?",
    "imagem": "id308.png",
    "escolhas": {
      "SIM": {
        "consequencia": "A visão mostrou o fim do mundo — você sorriu.",
        "salvos": 63822,
        "sacrificados": 116
      },
      "NAO": {
        "consequencia": "Você ficou cego para o amanhã. Mas em paz.",
        "salvos": 116,
        "sacrificados": 63822
      }
    }
  },
  {
    "id": "009",
    "pergunta": "Você tentou curar a peste com poemas?",
    "imagem": "id309.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Os versos foram belos. Os cadáveres, também.",
        "salvos": 0,
        "sacrificados": 400
      },
      "NAO": {
        "consequencia": "Sem palavras, sem consolo. Só gemidos no escuro.",
        "salvos": 0,
        "sacrificados": 400
      }
    }
  },
  {
    "id": "010",
    "pergunta": "Um Carrasco está deprimido você o consola?",
    "imagem": "id310.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele parou de matar por três dias. Um recorde.",
        "salvos": 5,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele chorou. Depois te decapitou. Emoções são perigosas.",
        "salvos": 0,
        "sacrificados": 1
      }
    }
  },
  {
    "id": "011",
    "pergunta": "Um dragão sobrevoa as capitais. Você o ataca?",
    "imagem": "id311.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele chorou. Só queria conselhos sobre alianças de casamento.",
        "salvos": 42000,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele interpretou seu silêncio como fraqueza. Três províncias viraram cinzas.",
        "salvos": 0,
        "sacrificados": 42000
      }
    }
  },
  {
    "id": "012",
    "pergunta": "O céu se abriu. Mil demônios surgiram com rosas. Você os recebe?",
    "imagem": "id312.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Era o Dia dos Namorados do Inferno. Vocês selaram uma trégua diplomática.",
        "salvos": 100000,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Você ofendeu o embaixador infernal. Uma cidade virou jardim carnívoro.",
        "salvos": 0,
        "sacrificados": 100000
      }
    }
  },
  {
    "id": "013",
    "pergunta": "O mar se partiu. Uma serpente de quilômetros rasteja rumo à costa. Você ataca?",
    "imagem": "id313.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Era surda e míope. Só queria praia. Mas agora está furiosa.",
        "salvos": 0,
        "sacrificados": 60000
      },
      "NAO": {
        "consequencia": "Ela se bronzeou e voltou ao fundo do mar. Deixou pérolas.",
        "salvos": 60000,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "014",
    "pergunta": "Sob o eclipse, um profeta sussurra: você é a chave. Vai escutá-lo?",
    "imagem": "id314.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Você era só um fusível cósmico. O eclipse cessou, e você... também.",
        "salvos": 0,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "O eclipse virou religião. O mundo esqueceu a luz. E você.",
        "salvos": 0,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "015",
    "pergunta": "Gigantes emergem do norte, marchando com tambores. Você interfere?",
    "imagem": "id315.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Os tambores eram convites para o Festival da Terra. Guerra começou por má tradução.",
        "salvos": 0,
        "sacrificados": 70000
      },
      "NAO": {
        "consequencia": "Eles dançaram e foram embora. Um gigante tropeçou, demoliu uma vila.",
        "salvos": 40000,
        "sacrificados": 3000
      }
    }
  },
  {
    "id": "016",
    "pergunta": "Um anjo em prantos cai do céu. Ele diz que 'algo terrível está vindo'. Você o ajuda?",
    "imagem": "id316.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O 'algo' era seu pai. Eles brigaram. Você foi atingido por acidente.",
        "salvos": 0,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "O anjo virou pedra. Agora adoram a estátua. Nada veio.",
        "salvos": 0,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "017",
    "pergunta": "Montanhas flutuam no horizonte. Chamam seu nome. Você escala?",
    "imagem": "id317.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Lá em cima, um deus esquecido queria só um amigo. Agora ele te segue.",
        "salvos": 12000,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "A montanha ficou triste. Caiu. Sepultou uma cidade.",
        "salvos": 0,
        "sacrificados": 12000
      }
    }
  },
  {
    "id": "018",
    "pergunta": "O tempo parou por uma hora. Todos te olharam. Você sorri?",
    "imagem": "id318.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O tempo gostou. Voltou. Mas agora você envelhece o triplo.",
        "salvos": 1000000,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "O tempo sentiu desprezo. Você virou estátua por 100 anos.",
        "salvos": 0,
        "sacrificados": 1
      }
    }
  },
  {
    "id": "019",
    "pergunta": "Um cometa negro vem em sua direção. Vozes pedem sacrifício. Você obedece?",
    "imagem": "id319.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O cometa desviou. Mas a voz... ficou.",
        "salvos": 30000,
        "sacrificados": 9
      },
      "NAO": {
        "consequencia": "O cometa caiu no oceano. Surgiu um novo continente. De carne.",
        "salvos": 30009,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "020",
    "pergunta": "Um portal púrpura surge na capital. Um bode gigante quer negociar. Você aceita?",
    "imagem": "id320.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele comprou metade do reino com areia cósmica. E sumiu.",
        "salvos": 7,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele se ofendeu. Transformou ministros em cogumelos.",
        "salvos": 0,
        "sacrificados": 7
      }
    }
  },
{
    "id": "021",
    "pergunta": "Um careca nervoso começou a atacar 6 pessoas ao mesmo tempo. Você tenta acalmá-lo?",
    "imagem": "id321.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Sua voz suave penetrou na fúria. O brilho de sua cabeça diminuiu e ele caiu de joelhos, chorando.",
        "salvos": 6,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "A fúria cresceu. Sua cabeça brilhou como um sol. Nada restou além de poeira.",
        "salvos": 0,
        "sacrificados": 6
      }
    }
  },
  {
    "id": "022",
    "pergunta": "Um palhaço chorando oferece um balão vermelho. Você aceita?",
    "imagem": "id322.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O balão te levou para uma festa onde a tristeza era proibida. Você nunca mais sentiu nada.",
        "salvos": 1,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Ele soluçou. O balão explodiu, e a alegria do mundo murchou um pouco.",
        "salvos": 300,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "023",
    "pergunta": "Seu gato começa a falar sobre o fim do mundo. Você o escuta?",
    "imagem": "id323.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Ele estava certo. Mas agora ele fala demais.",
        "salvos": 7000,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "Você o ignorou. O mundo acabou, e o gato te olhou com reprovação.",
        "salvos": 0,
        "sacrificados": 7000
      }
    }
  },
  {
    "id": "024",
    "pergunta": "Um louco quer ser o Imperador do mundo. Você o impede?",
    "imagem": "id324.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Uma guerra nunca antes vista se formou e metade da população morreu.",
        "salvos": 0,
        "sacrificados": 15000
      },
      "NAO": {
        "consequencia": "Ele foi um Imperador virtuoso, no futuro será chamado de Santo.",
        "salvos": 30000,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "025",
    "pergunta": "Um pombo demoníaco aparece. Você o mata?",
    "imagem": "id325.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Era só um pombo cara...",
        "salvos": 0,
        "sacrificados": 15000
      },
      "NAO": {
        "consequencia": "Uma nova espécie de pombo que adora caçar ratos surgiu.",
        "salvos": 30000,
        "sacrificados": 0
      }
    }
  }
  
];

// Array para armazenar as escolhas já utilizadas
let escolhasUtilizadas: string[] = [];

export const getRandomEscolha = (): Escolha => {
  // Se todas as escolhas já foram utilizadas, reinicia o array
  if (escolhasUtilizadas.length >= escolhas.length) {
    escolhasUtilizadas = [];
  }

  // Filtra as escolhas que ainda não foram utilizadas
  const escolhasDisponiveis = escolhas.filter(
    escolha => !escolhasUtilizadas.includes(escolha.id)
  );

  // Segurança extra: caso por algum motivo o array esteja vazio, reinicia
  if (escolhasDisponiveis.length === 0) {
    escolhasUtilizadas = [];
    return getRandomEscolha(); // Chamada recursiva segura
  }

  // Seleciona uma escolha aleatória das disponíveis
  const randomIndex = Math.floor(Math.random() * escolhasDisponiveis.length);
  const escolhaSelecionada = escolhasDisponiveis[randomIndex];

  // Adiciona a escolha ao array de utilizadas
  escolhasUtilizadas.push(escolhaSelecionada.id);

  return escolhaSelecionada;
};

// Função para reiniciar o ciclo de escolhas manualmente
export const reiniciarEscolhas = () => {
  escolhasUtilizadas = [];
};

  