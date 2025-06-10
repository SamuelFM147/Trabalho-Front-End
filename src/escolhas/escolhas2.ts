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
    "pergunta": "Você é o novo Vigia?",
    "imagem": "vigia_duvida.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Bravo. Um mártir a caminho do esquecimento.",
        "salvos": 5,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "Sua fuga foi poética. Quase.",
        "salvos": 0,
        "sacrificados": 3
      }
    }
  },
  {
    "id": "002",
    "pergunta": "A criança perdida precisa de ajuda. Vai salvá-la?",
    "imagem": "crianca_perdida.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Sua compaixão ecoa através das sombras.",
        "salvos": 8,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "O silêncio das crianças é ensurdecedor.",
        "salvos": 2,
        "sacrificados": 5
      }
    }
  },
  {
    "id": "003",
    "pergunta": "O portal para o vazio se abre. Vai atravessá-lo?",
    "imagem": "portal_vazio.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Você dança no limiar entre mundos.",
        "salvos": 3,
        "sacrificados": 2
      },
      "NAO": {
        "consequencia": "A covardia às vezes é sabedoria disfarçada.",
        "salvos": 6,
        "sacrificados": 1
      }
    }
  },
  {
    "id": "004",
    "pergunta": "As memórias dolorosas se manifestam. Vai enfrentá-las?",
    "imagem": "memorias_dor.png",
    "escolhas": {
      "SIM": {
        "consequencia": "A dor transformada em força é devastadora.",
        "salvos": 7,
        "sacrificados": 3
      },
      "NAO": {
        "consequencia": "Fugir das memórias é fugir de si mesmo.",
        "salvos": 1,
        "sacrificados": 4
      }
    }
  },
  {
    "id": "005",
    "pergunta": "O demônio oferece poder infinito. Vai aceitar?",
    "imagem": "demonio_poder.png",
    "escolhas": {
      "SIM": {
        "consequencia": "O poder corrompe, mas às vezes é necessário.",
        "salvos": 10,
        "sacrificados": 8
      },
      "NAO": {
        "consequencia": "A pureza tem seu próprio tipo de força.",
        "salvos": 4,
        "sacrificados": 0
      }
    }
  },
  {
    "id": "006",
    "pergunta": "Sua filha aparece em sonhos. Vai segui-la?",
    "imagem": "filha_sonho.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Algumas ilusões são mais reais que a realidade.",
        "salvos": 2,
        "sacrificados": 1
      },
      "NAO": {
        "consequencia": "Aceitar a perda é o primeiro passo para a redenção.",
        "salvos": 5,
        "sacrificados": 2
      }
    }
  },
  {
    "id": "007",
    "pergunta": "O mundo está em chamas. Vai tentar salvá-lo?",
    "imagem": "mundo_chamas.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Heróis nascem das cinzas da destruição.",
        "salvos": 15,
        "sacrificados": 5
      },
      "NAO": {
        "consequencia": "Às vezes, é preciso deixar queimar para renascer.",
        "salvos": 0,
        "sacrificados": 12
      }
    }
  },
  {
    "id": "008",
    "pergunta": "O espelho mostra seu verdadeiro eu. Vai olhar?",
    "imagem": "espelho_verdade.png",
    "escolhas": {
      "SIM": {
        "consequencia": "A verdade dói, mas liberta a alma.",
        "salvos": 6,
        "sacrificados": 2
      },
      "NAO": {
        "consequencia": "A negação é uma prisão dourada.",
        "salvos": 3,
        "sacrificados": 3
      }
    }
  },
  {
    "id": "009",
    "pergunta": "Os mortos sussurram segredos. Vai escutar?",
    "imagem": "mortos_segredos.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Os mortos falam verdades que os vivos temem.",
        "salvos": 4,
        "sacrificados": 6
      },
      "NAO": {
        "consequencia": "Silenciar os mortos é silenciar a história.",
        "salvos": 7,
        "sacrificados": 1
      }
    }
  },
  {
    "id": "010",
    "pergunta": "O fim se aproxima. Vai abraçá-lo ou resistir?",
    "imagem": "fim_chegando.png",
    "escolhas": {
      "SIM": {
        "consequencia": "Aceitar o fim é o último ato de sabedoria.",
        "salvos": 0,
        "sacrificados": 0
      },
      "NAO": {
        "consequencia": "A resistência é a última chama da humanidade.",
        "salvos": 12,
        "sacrificados": 4
      }
    }
  }
];

// Função para obter uma escolha aleatória
export const getRandomEscolha = (): Escolha => {
  if (escolhas.length === 0) {
    throw new Error('Nenhuma escolha disponível!');
  }
  
  const randomIndex = Math.floor(Math.random() * escolhas.length);
  const escolhaSelecionada = escolhas[randomIndex];
  
  console.log(`Escolha aleatória selecionada: ID ${escolhaSelecionada.id} - ${escolhaSelecionada.pergunta}`);
  
  return escolhaSelecionada;
};
  