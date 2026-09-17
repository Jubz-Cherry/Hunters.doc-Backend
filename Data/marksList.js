const marksList = [
    {
      name: "A Marca de Caim",
      banner: "https://hunters-doc.onrender.com/imguns/caim_mark.jpg",
    
      origin: "Criada por Deus no início dos tempos para servir como uma chave para trancar a Escuridão (Amara). Deus a deu a Lúcifer, que a passou para Caim, e Caim a transferiu para Dean Winchester.",
    
      appearance: "Uma cicatriz avermelhada e em relevo que lembra uma letra ou um gancho estilizado (baseada na primeira letra do alfabeto fenício).",
    
      description: "Uma das maldições mais antigas e perigosas do universo. É a fonte de toda a maldade original da Terra.",
    
      powers_offered: "Imortalidade (o portador volta como Demônio dos Olhos Pretos se morrer), superforça, imunidade a poderes demoníacos e a habilidade de usar a Primeira Lâmina (única arma capaz de matar Cavaleiros do Inferno).",
    
      effects_on_person: "Causa uma sede de sangue incontrolável, raiva extrema, pesadelos violentos e corrupção total da alma, transformando qualquer pessoa boa em um monstro.",
    
      weakness: "Pode ser removida com um feitiço do Livro dos Condenados, mas removê-la sem passá-la para outra pessoa liberta a Escuridão no mundo."
    
    },
    {
      name: "Tatuagem Antipossessão",
    
      origin: "Criada por caçadores antigos e passada de geração em geração. Sam e Dean a tatuam no peito na segunda temporada da série.",
    
      appearance: "Um pentagrama (estrela de cinco pontas) estilizado dentro de um círculo, cercado por chamas ou raios de sol que apontam para fora.",
    
      description: "Uma marca permanente na pele usada como um escudo espiritual constante.",
    
      powers_offered: "Proteção absoluta contra possessão demoníaca.",
    
      effects_on_person: "Nenhum efeito colateral negativo na mente ou no corpo; funciona apenas como uma barreira passiva.",
    
      weakness: "Se a pele onde a tatuagem está for cortada, queimada ou desfigurada, o símbolo é quebrado e o demônio pode possuir o corpo imediatamente."
    
    },
    {
      name: "Símbolo de Banimento de Anjos",
    
      origin: "Magia angelical antiga gravada na história cósmica. Anna Milton lembra-se dele, e Castiel o usa frequentemente.",
    
      appearance: "Um desenho geométrico que lembra vagamente uma mão espalmada com asas e linhas que se cruzam na base.",
    
      description: "Um símbolo defensivo desenhado em paredes, portas ou superfícies planas para afastar seres celestiais.",
    
      powers_offered: "Teleporta instantaneamente todos os anjos que estão na área para um lugar aleatório muito distante na Terra.",
    
      effects_on_person: "Exige que seja desenhado com sangue humano real. Ativar o símbolo exige bater a mão aberta com força no centro dele, o que pode causar dor ou cansaço.",
    
      weakness: "É temporário. O símbolo não mata e nem machuca permanentemente os anjos; eles podem voar de volta para o local assim que descobrirem onde foram parar."
    
    },
    {
      name: "Hexagrama Unicursal (Estrela dos Homens de Letras)",
    
      origin: "Símbolo oficial dos Homens de Letras, uma sociedade secreta que estuda o sobrenatural de forma científica.",
    
      appearance: "Uma estrela de seis pontas desenhada com uma única linha contínua, sem que o traço seja interrompido.",
    
      description: "Representa o equilíbrio universal e o ápice do conhecimento místico e científico humano.",
    
      powers_offered: "Usado para abrir portais para bunkers escondidos, filtrar magias e identificar membros legítimos da organização.",
    
      effects_on_person: "Não altera o corpo humano diretamente, mas serve como um selo de autoridade mística.",
    
      weakness: "Por ser apenas um símbolo organizacional e de tranca, não oferece proteção física direta contra ataques de monstros fortes se não estiver energizado por feitiços extras."
    
    },
    {
      name: "Símbolos Enoquianos nas Costelas",
    
      origin: "Gravados cirurgicamente nos ossos de Sam e Dean pelo anjo Castiel (e mais tarde por outros anjos em si mesmos).",
    
      appearance: "Runas da língua dos anjos (Enochiano) esculpidas diretamente na superfície das costelas.",
    
      description: "Um feitiço de camuflagem de nível divino costurado no próprio esqueleto do portador.",
    
      powers_offered: "Torna o portador completamente invisível para qualquer anjo, arcanjo e até mesmo para demônios de alto escalão. Ninguém consegue rastreá-los magicamente.",
    
      effects_on_person: "Causa uma dor física insuportável no momento em que as runas são esculpidas. Não altera a mente do portador.",
    
      weakness: "Não esconde a pessoa de ameaças humanas, monstros comuns ou de rastreamento físico tradicional (como pegadas ou câmeras)."
    
    },
    {
      name: "Armadilha de Demônios",
    
      origin: "Baseada na Chave de Salomão, um grimório medieval de magia. É a ferramenta mais usada pelos caçadores na série.",
    
      appearance: "Um pentagrama ou um hexagrama cercado por uma linha circular contendo vários símbolos e palavras antigas cabalísticas.",
    
      description: "Um círculo mágico desenhado no teto, chão ou tapetes para capturar seres infernais.",
    
      powers_offered: "Prende qualquer demônio que pisar dentro de seus limites, bloqueando seus poderes sobrenaturais (como teletransporte e telecinese).",
    
      effects_on_person: "Não afeta seres humanos comuns. Nos demônios, causa grande aflição física e os deixa vulneráveis a interrogatórios e exorcismos.",
    
      weakness: "Qualquer quebra física na linha do desenho (como um arranhão no giz, um rasgo no tapete ou lama cobrindo uma parte) quebra o feitiço instantaneamente e liberta o demônio."
    
    },
    {
      name: "Símbolo de Aprisionamento de Anjos",
    
      origin: "Magia enochiana antiga usada para caçar ou controlar mensageiros do céu.",
    
      appearance: "Um círculo perfeito feito com óleo sagrado purificado desenhado no chão.",
    
      description: "O equivalente celestial da Armadilha de Demônios.",
    
      powers_offered: "Quando o óleo sagrado é aceso com fogo, as chamas bloqueiam os poderes do anjo e o impedem de sair de dentro do círculo.",
    
      effects_on_person: "Não afeta humanos, mas se o anjo tentar tocar nas chamas sagradas, sua casca humana e sua essência serão destruídas,",
    
      weakness: "Se a linha de óleo for interrompida por algum objeto externo jogado de fora (como água ou terra), o fogo se apaga e o anjo escapa."
    
    },
    {
      name: "A Queimadura de Castiel",
    
      origin: "Criada pelo anjo Castiel no momento exato em que ele desceu ao Inferno para resgatar a alma de Dean Winchester.",
    
      appearance: "Uma cicatriz profunda e escura no ombro esquerdo de Dean, com o formato exato de uma mão humana espalhada.",
    
      description: "Uma cicatriz de queimadura mística permanente deixada pela pura energia celestial de um anjo tocando uma alma humana.",
    
      powers_offered: "Nenhum poder prático ao portador, mas serve como prova física de que Dean foi salvo pelo Céu.",
    
      effects_on_person: "Serviu como uma âncora para reconstruir o corpo de Dean exatamente como era antes de morrer.",
     
      weakness: "É apenas uma cicatriz física residual e não oferece proteção mágica ativa contra outros perigos."
    
    },
    {
      name: "O Símbolo Ceifado",
     
      origin: "Criada por magos antigos e necromantes para subjugar os guias da morte. Aparece proeminentemente quando Bobby tenta prender uma ceifeira.",
     
      appearance: "Um desenho complexo com uma foice estilizada no centro, cercada por linhas geométricas pontiagudas e runas raras.",
     
      description: "Uma armadilha mágica altamente específica projetada para prender e controlar Ceifeiros (os seres que levam as almas para o pós-vida).",
     
      powers_offered: "Permite que um humano prenda um ceifeiro, force-o a obedecer ordens ou até drene sua energia mística.",
     
      effects_on_person: "Deixa o conjurador exposto à fúria da própria Morte se algo der errado.",
      
      weakness: "Exige sangue humano na confecção e, assim como as outras armadilhas, se o desenho for borrado ou rasgado, perde o efeito."
    
    },
    {
      name: "A Marca de Alastair",
      
      origin: "Desenvolvida por Alastair, o torturador-chefe do Inferno.",
      
      appearance: "Uma série de linhas angulares e pontas afiadas que lembram ganchos de carne cruzados.",
      
      description: "Símbolos esculpidos ou pintados nas salas de tortura do Inferno.",
      
      powers_offered: "Prende a alma de uma criatura ou anjo a uma cadeira ou mesa de tortura, impedindo que o prisioneiro use qualquer cura ou use telepatia para pedir socorro.",
      
      effects_on_person: "Causa imensa dor espiritual e enfraquece a vontade do prisioneiro ao longo do tempo.",
    
      weakness: "O símbolo precisa ser ativado com rituais de dor constantes; se o torturador for interrompido, o prisioneiro pode tentar lutar contra a contenção."
    
    },
    {
      name: "Selo dos Quatro Cavaleiros",
      
      origin: "Símbolos e runas ligados aos anéis mágicos dos Quatro Cavaleiros do Apocalipse (Guerra, Fome, Peste e Morte).",
      
      appearance: "Anéis com pedras coloridas cujas bases e runas gravadas, quando unidas, formam um diagrama em formato de fechadura geométrica tridimensional.",
      
      description: "A engrenagem mística definitiva capaz de interagir com o chão para abrir e fechar a cela mais protegida do submundo.",
      
      powers_offered: "Controla com exclusividade a abertura e o fechamento do portal que leva diretamente para a Jaula de Lúcifer no Inferno.",
      
      effects_on_person: "Permite que o conjurador manipule o portal e controle o fluxo de almas entre o mundo dos vivos e o Inferno.",
      
      weakness: "A eficácia do selo depende da integridade das pedras coloridas; se alguma for danificada, o selo pode falhar."
    
    },
]

module.exports = marksList;