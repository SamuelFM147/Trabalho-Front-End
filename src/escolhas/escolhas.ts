import { GameData } from '../types/gameTypes';

export const jsonData: GameData = [
  {
    "id": "0",
    "mensagem": "O momento chegou. Onde você deseja enterrar sua filha?",
    "possiveis_destinos": [
      {
        "destino_id": "1",
        "code_condicao": "Enterrar junto da mãe",
        "descricao_opcao": "Você decide enterrar sua filha junto de sua mãe no cemitério local"
      },
      {
        "destino_id": "2",
        "code_condicao": "Enterrar embaixo da árvore",
        "descricao_opcao": "Você escolhe enterrar sua filha embaixo da árvore onde ela costumava se balançar"
      }
    ]
  },
  {
    "id": "1",
    "mensagem": "Enquanto enterra sua filha, você nota um homem também enterrando sua esposa. Ele parece estar em grande angústia, assim como você.",
    "possiveis_destinos": [
      {
        "destino_id": "1.1",
        "code_condicao": "Conversar com o homem",
        "descricao_opcao": "Você decide conversar com o homem, compartilhando sua dor e desenvolvendo uma amizade"
      }
    ]
  },
  {
    "id": "1.1",
    "mensagem": "O homem, após compartilhar sua história, oferece te levar para Windhelm. No caminho, vocês são abordados por um exército do rei tirano.",
    "possiveis_destinos": [
      {
        "destino_id": "GAME_OVER_1",
        "code_condicao": "Ser morto pelo exército",
        "descricao_opcao": "O rei ordena sua morte e a de seu novo amigo. Fim de jogo."
      }
    ]
  },
  {
    "id": "2",
    "mensagem": "Após enterrar sua filha sob a árvore, seu espírito amargurado te faz caminhar sem rumo pela estrada de terra próxima.",
    "possiveis_destinos": [
      {
        "destino_id": "3",
        "code_condicao": "Continuar caminhando",
        "descricao_opcao": "Você segue pela estrada, perdido em seus pensamentos"
      }
    ]
  },
  {
    "id": "3",
    "mensagem": "Um mendigo sujo se aproxima, implorando por alguma moeda para comer.",
    "possiveis_destinos": [
      {
        "destino_id": "3.1",
        "code_condicao": "Dar uma moeda",
        "descricao_opcao": "Você decide ajudar o mendigo, dando-lhe uma moeda",
        "define_condicao": "ajudou_mendigo"
      },
      {
        "destino_id": "3.2",
        "code_condicao": "Não dar nada",
        "descricao_opcao": "Você decide não dar nada ao mendigo"
      }
    ]
  },
  {
    "id": "3.1",
    "mensagem": "O mendigo agradece e te avisa sobre uma bifurcação na estrada, recomendando seguir pelo caminho da esquerda.",
    "possiveis_destinos": [
      {
        "destino_id": "4",
        "code_condicao": "Chegar na bifurcação",
        "descricao_opcao": "Você chega na bifurcação mencionada pelo mendigo",
        "define_condicao": "recebeu_conselho_mendigo"
      }
    ]
  },
  {
    "id": "3.2",
    "mensagem": "O mendigo abaixa a cabeça em silêncio e deseja boa sorte. Você continua seu caminho.",
    "possiveis_destinos": [
      {
        "destino_id": "4",
        "code_condicao": "Chegar na bifurcação",
        "descricao_opcao": "Você chega na bifurcação da estrada"
      }
    ]
  },
  {
    "id": "4",
    "mensagem": "Você se depara com uma bifurcação na estrada. Para onde você vai?",
    "possiveis_destinos": [
      {
        "destino_id": "4.1",
        "code_condicao": "Seguir pela esquerda (se recebeu conselho do mendigo)",
        "descricao_opcao": "Você segue pelo caminho da esquerda, entrando em uma floresta escura e sombria",
        "requer_condicao": "recebeu_conselho_mendigo"
      },
      {
        "destino_id": "4.2",
        "code_condicao": "Seguir pela direita",
        "descricao_opcao": "Você segue pelo caminho da direita, continuando pela estrada"
      }
    ]
  },
  {
    "id": "4.1",
    "mensagem": "Na floresta escura, você encontra uma criança perdida chorando.",
    "possiveis_destinos": [
      {
        "destino_id": "5",
        "code_condicao": "Ajudar a criança",
        "descricao_opcao": "Você decide ajudar a criança, caminhando de mãos dadas para fora da floresta",
        "define_condicao": "tem_crianca"
      }
    ]
  },
  {
    "id": "4.2",
    "mensagem": "Um grupo de 4 bandidos te aborda, exigindo todo seu dinheiro.",
    "possiveis_destinos": [
      {
        "destino_id": "4.2.1",
        "code_condicao": "Dar o dinheiro (se ainda tiver)",
        "descricao_opcao": "Você entrega seu dinheiro aos bandidos",
        "requer_condicao": "tem_dinheiro"
      },
      {
        "destino_id": "GAME_OVER_2",
        "code_condicao": "Recusar ou não ter dinheiro",
        "descricao_opcao": "Os bandidos te atacam e você morre. Fim de jogo."
      }
    ]
  },
  {
    "id": "4.2.1",
    "mensagem": "Mesmo após dar o dinheiro, os bandidos te surram por diversão, ferindo sua perna direita.",
    "possiveis_destinos": [
      {
        "destino_id": "5",
        "code_condicao": "Continuar para Windhelm",
        "descricao_opcao": "Você segue para Windhelm, mancando devido ao ferimento"
      }
    ]
  },
  {
    "id": "5",
    "mensagem": "Você chega em Windhelm, uma cidade em ruínas, com famílias se abrigando em cabanas.",
    "possiveis_destinos": [
      {
        "destino_id": "5.1",
        "code_condicao": "Chegar com a criança",
        "descricao_opcao": "A família da criança te encontra e oferece recompensa e abrigo",
        "requer_condicao": "tem_crianca"
      },
      {
        "destino_id": "5.1",
        "code_condicao": "Chegar sozinho",
        "descricao_opcao": "Você vaga pela cidade, observando as famílias desabrigadas"
      }
    ]
  },
  {
    "id": "5.1",
    "mensagem": "Dias depois, um grupo de soldados rebeldes te aborda, pedindo para se juntar à resistência contra o rei tirano.",
    "possiveis_destinos": [
      {
        "destino_id": "6.1",
        "code_condicao": "Aceitar juntar-se à resistência",
        "descricao_opcao": "Você se torna um soldado da resistência, recebendo treinamento e equipamentos"
      },
      {
        "destino_id": "6.2",
        "code_condicao": "Recusar",
        "descricao_opcao": "Você recusa o convite dos rebeldes"
      }
    ]
  },
  {
    "id": "6.1",
    "mensagem": "O comandante te chama para uma reunião urgente. O exército do rei está se aproximando.",
    "possiveis_destinos": [
      {
        "destino_id": "6.1.1",
        "code_condicao": "Aumentar número de arqueiros",
        "descricao_opcao": "Você sugere focar em aumentar o número de arqueiros"
      },
      {
        "destino_id": "6.1.2",
        "code_condicao": "Aumentar número de infantaria",
        "descricao_opcao": "Você sugere focar em aumentar o número de soldados de infantaria"
      }
    ]
  },
  {
    "id": "6.1.1",
    "mensagem": "Os arqueiros conseguem enfraquecer o exército inimigo, levando à vitória. Você se torna um comandante respeitado.",
    "possiveis_destinos": [
      {
        "destino_id": "VITORIA_1",
        "code_condicao": "Final vitorioso",
        "descricao_opcao": "Você passa o resto de seus dias como um símbolo de esperança para o povo"
      }
    ]
  },
  {
    "id": "6.1.2",
    "mensagem": "O exército inimigo invade a cidade. Você corre para a pousada onde está a criança que salvou.",
    "possiveis_destinos": [
      {
        "destino_id": "6.1.2.1",
        "code_condicao": "Tentar salvar a criança",
        "descricao_opcao": "Você luta contra os soldados para salvar a criança"
      },
      {
        "destino_id": "6.1.2.2",
        "code_condicao": "Abandonar a criança",
        "descricao_opcao": "Você decide fugir, abandonando a criança"
      }
    ]
  },
  {
    "id": "6.1.2.1",
    "mensagem": "Você consegue salvar a criança, mas é atingido por uma flecha no peito.",
    "possiveis_destinos": [
      {
        "destino_id": "GAME_OVER_3",
        "code_condicao": "Morte heroica",
        "descricao_opcao": "Você morre salvando a criança. Fim de jogo."
      }
    ]
  },
  {
    "id": "6.1.2.2",
    "mensagem": "Você foge da cidade, mas o peso na consciência é grande demais.",
    "possiveis_destinos": [
      {
        "destino_id": "GAME_OVER_4",
        "code_condicao": "Suicídio",
        "descricao_opcao": "O remorso te leva a tirar sua própria vida. Fim de jogo."
      }
    ]
  },
  {
    "id": "6.2",
    "mensagem": "Os soldados te chamam de covarde.",
    "possiveis_destinos": [
      {
        "destino_id": "GAME_OVER_5",
        "code_condicao": "Responder com violência",
        "descricao_opcao": "Você é morto pelos soldados. Fim de jogo."
      },
      {
        "destino_id": "7",
        "code_condicao": "Ignorar os insultos",
        "descricao_opcao": "Você é expulso de Windhelm"
      }
    ]
  },
  {
    "id": "7",
    "mensagem": "Após ser expulso, você chega em Whiterun, quase morto de fome e sede.",
    "possiveis_destinos": [
      {
        "destino_id": "7.1",
        "code_condicao": "Conhecer a médica",
        "descricao_opcao": "Uma médica te ajuda a se recuperar"
      }
    ]
  },
  {
    "id": "7.1",
    "mensagem": "A médica demonstra interesse por você. Você a convida para um festival de dança.",
    "possiveis_destinos": [
      {
        "destino_id": "7.1.1",
        "code_condicao": "Enfrentar o ex-marido",
        "descricao_opcao": "O ex-marido da médica te desafia para um duelo"
      },
      {
        "destino_id": "GAME_OVER_6",
        "code_condicao": "Recusar o duelo",
        "descricao_opcao": "A humilhação pública te leva ao suicídio. Fim de jogo."
      }
    ]
  },
  {
    "id": "7.1.1",
    "mensagem": "Você vence o duelo, perdendo um olho, mas ganhando o respeito da cidade.",
    "possiveis_destinos": [
      {
        "destino_id": "VITORIA_2",
        "code_condicao": "Final feliz",
        "descricao_opcao": "Você se casa com a médica e cria uma nova vida em Whiterun"
      }
    ]
  },
  {
    "id": "GAME_OVER_1",
    "mensagem": "O rei tirano ordena sua execução. Sua jornada termina aqui, mas sua história de resistência inspira outros a continuarem lutando.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "GAME_OVER_2",
    "mensagem": "Os bandidos são impiedosos. Sua jornada termina em sangue na estrada.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "GAME_OVER_3",
    "mensagem": "Você morre como um herói, salvando uma vida inocente. Sua história será lembrada.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "GAME_OVER_4",
    "mensagem": "O peso da culpa é demais para carregar. Sua jornada termina em tristeza.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "GAME_OVER_5",
    "mensagem": "A violência gera mais violência. Sua jornada termina em conflito.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "GAME_OVER_6",
    "mensagem": "A humilhação pública é demais para suportar. Sua jornada termina em desespero.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Reiniciar jogo",
        "descricao_opcao": "Tentar novamente"
      }
    ]
  },
  {
    "id": "VITORIA_1",
    "mensagem": "Você lidera a resistência à vitória! O rei tirano é derrotado e você se torna um símbolo de esperança para o povo. Sua filha estaria orgulhosa.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Jogar novamente",
        "descricao_opcao": "Começar uma nova jornada"
      }
    ]
  },
  {
    "id": "VITORIA_2",
    "mensagem": "Você encontra um novo propósito em Whiterun. Apesar de todas as perdas, você constrói uma nova família e uma nova vida. Sua filha estaria feliz por você ter encontrado paz.",
    "possiveis_destinos": [
      {
        "destino_id": "RESTART",
        "code_condicao": "Jogar novamente",
        "descricao_opcao": "Começar uma nova jornada"
      }
    ]
  },
  {
    "id": "RESTART",
    "mensagem": "Deseja começar uma nova jornada?",
    "possiveis_destinos": [
      {
        "destino_id": "0",
        "code_condicao": "Sim",
        "descricao_opcao": "Começar do início"
      }
    ]
  }
] 