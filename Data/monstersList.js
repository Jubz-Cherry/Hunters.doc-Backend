
const monstersList = [
  {
    name: "Vampiro",
    origin: "Folclore europeu (principalmente do Leste Europeu, como Romênia e Sérvia)",
    banner: "http://localhost:3001/imagens/vampires.jpg",

    description: ["Vampiros são predadores noturnos imortais, conhecidos por sua força sobre-humana, sentidos aguçados e sede insaciável por sangue.",
    "Vampiros não temem cruzes, alho ou água benta. Também não queimam sob o sol, embora prefiram evitá-lo por desconforto e discrição.",
    "Vampiros costumam viver em pequenos grupos chamados 'ninhos',",
    "liderados por um alfa ou um vampiro mais velho. São caçadores por natureza e poucos escolhem se alimentar de sangue animal.", 
    "A maioria considera os humanos simples presas — e muito raramente, aliados."],

    custom:["Vampiros geralmente mantêm aparência humana, mas possuem dentes afiados (presas) para perfurar a pele das vítimas.",
    "Podem apresentar palidez, olhos brilhantes e, em algumas versões, reflexo ausente em espelhos."],

    behavior:["São predadores noturnos que caçam suas vítimas para se alimentar.",
    "Muitas vezes são retratados como seres astutos, manipuladores e imortais."],  

    transformation:["A transformação ocorre quando um humano é mordido por um vampiro e ingere o sangue dele.",
    "Após isso, o corpo entra em mutação, os dentes se tornam serrilhados, e a sede por sangue se torna insuportável.", 
    "Nos primeiros dias, o novo vampiro sente uma dor física e psicológica intensa, sua humanidade começa a desaparecer"],
    
    cure:["Existe uma cura para vampiros recém-transformados, **desde que não tenham consumido sangue humano ainda**.", 
    "O processo envolve fazer a vítima ingerir uma dose do sangue do vampiro que a infectou. Isso reverte a mutação, devolvendo sua condição humana.",
    "O ritual é extremamente doloroso e só funciona em estágios iniciais da transformação."],
    
    weaknesses: ["Decapitação (única maneira de matá-los)",
    "Autocontrole frágil em recém-transformados",
    "Recém-transformados podem ser curados, a menos que ainda não tenham ingerido sangue",
    "Luz solar incomoda, mas não mata"],
    image: "http://localhost:3001/imagens/vampires.jpg",
  },
  {
    name: "Lobisomem",
    banner: "http://localhost:3001/imagens/lobi.jpg",
    origin: "Lendas e relatos de caçadores nos Estados Unidos, baseados em folclores europeus e americanos",
    
    description: ["Acreditava-se que o lobisomem era um humano que, por maldição ou pacto com forças sobrenaturais,",
    "se transformava em um lobo ou em uma criatura metade homem, metade lobo.",
    "Essa transformação acontecia geralmente nas noites de lua cheia.",
    "Geralmente, a maldição do lobisomem é transmitida por meio de mordida ou arranhão de outro lobisomem,",
    "tornando a vítima uma nova criatura."],

    custom:["Durante a transformação, o lobisomem apresenta força, agilidade e sentidos muito superiores aos humanos comuns.",
    "Sua pele é coberta por pelos e suas garras e dentes são afiados."],

    behavior:[" Lobisomens são conhecidos por serem agressivos, principalmente quando transformados.",
    "Em muitos mitos, eles perdem o controle e atacam qualquer um que estiver por perto."],

    transformation:["Geralmente, a maldição do lobisomem é transmitida por meio de mordida ou arranhão de outro lobisomem,",
    "tornando a vítima uma nova criatura."],

    cure:["Uma vez que um ser humano se transforma, não há volta"],

    weaknesses: ["Coisas de prata,",
      "Faca de prata no coração"],
    image: "http://localhost:3001/imagens/lobi.jpg",
  },
  {
    name: "Wendigo",
    banner: "http://localhost:3001/imagens/wendigo.jpg",
    origin: ["O Wendigo é uma criatura mítica originária das lendas dos povos indígenas do norte da América,",
    "especialmente das tribos algonquinas."],

    description: ["O Wendigo é geralmente descrito como o espírito do inverno, da fome e da ganância,",
    "que pode possuir humanos ou transformar pessoas em monstros famintos e insaciáveis.",
    "O Wendigo não envelhece, não dorme e é praticamente impossível de rastrear. Quando escolhe uma vítima,",
    "ela dificilmente escapa. Sua fome nunca passa — quanto mais carne humana consome, mais sente necessidade de continuar caçando."],

    custom:["Em muitas descrições, o Wendigo é uma criatura gigante, esquelética, com pele ressecada,",
    "olhos profundos e um odor fétido. Algumas versões o retratam com chifres ou características animais."],

    behavior:[" É conhecido pela fome insaciável por carne humana, caçando e devorando pessoas.",
    "O Wendigo representa a perda da humanidade pelo consumo voraz de carne humana e o desespero."],

    transformation:["Canibalismo em situações extremas de fome",
    " A transformação em Wendigo ocorre quando uma pessoa, isolada e desesperada, recorre ao canibalismo para sobreviver.",
    "Se o ato é cometido com ganância, ou sem arrependimento, a alma é corrompida e o espírito do Wendigo assume."],

    cure:["Não existe cura conhecida para o Wendigo. Uma vez transformado, só pode ser destruído com fogo."],

    weaknesses: ["Fogo (única forma confiável de matá-lo)",
    "Extrema vulnerabilidade a chamas intensas",
    "Pode ser enfraquecido com armadilhas e balas, mas não morto"],

    image: "http://localhost:3001/imagens/wendigo.jpg",
  },
  {
    name:"Demônio",
    banner:"http://localhost:3001/imagens/demon.jpg",

    origin:["Demônios são frequentemente descritos como espíritos caídos ou seres de outras dimensões,",
    "que buscam corromper, possuir ou destruir humanos."],
    
    description:[": `Demônios são almas humanas corrompidas após extensas torturas no Inferno.",
    "São entidades feitas de fumaça negra e podem possuir corpos humanos, ganhando acesso ao mundo dos vivos.",
    "Quando possuem um corpo, aparentam ser humanos comuns, mas revelam sua verdadeira natureza pelos olhos negros",
    "(ou de outras cores, dependendo do poder). São manipuladores, cruéis e extremamente perigosos."],
    
    custom:["Podem assumir diversas formas,",
    "desde figuras humanóides, humanas até criaturas monstruosas, muitas vezes deformadas ou assustadoras."],
    
    behavior:["Demônios costumam manipular, possuir ou influenciar pessoas para causar caos, sofrimento e destruição."],
    
    transformation:["`Quando uma alma humana morre e é enviada ao Inferno — geralmente por ter cometido pecados graves ou",
    "por fazer um pacto com um demônio — ela é torturada por anos. Com o tempo, se a alma cede e passa a torturar outras,",
    "ela perde sua humanidade e se transforma em um demônio."],

    cure:["Não há cura, dependendo da tradição, demônios podem ser banidos ou exorcizados por rituais religiosos,",
    "símbolos sagrados como um pentagrama, água benta ou oração. Não é uma cura, mas sim, uma forma de devolver a almda de volta ao inferno temporáriamente."],
   
    weaknesses:["Água benta queima, exorcismo, usar símbolos contenção -sigilos demoníacos- como forma de aprisionar-los,",
    "desenhar um pentagrama no chão pode ser útil se quiser mater um demônio preso enquanto faz o exorcismo.",
    "Pode também matar eles com a faca demoníaca -faca que mata somente demônios-, code -arma perdida feita por Sammuel Code com balas",
    "especiais que matam qualquer coisa-, faca dos anjos -mata anjos e demônios, lâmina forjada com metal celestial, um material que só existe no Céu.-"],
   
    image: "http://localhost:3001/imagens/demon.jpg",
  },
  {
    name: "Anjo",
    banner:"http://localhost:3001/imagens/anjos.jpg",
    origin: [
    "Anjos são seres celestiais criados por Deus para servir como mensageiros, guerreiros e guardiões do Céu.",
    "Eles existem desde antes da criação da humanidade e desempenham papéis fundamentais na ordem divina."],
    
    description: [
    ": `Anjos são entidades extremamente poderosas, compostas de pura graça celestial.",
    "Apesar de não possuírem forma física real, eles tomam corpos humanos (vasos) para interagir com o mundo físico.",
    "Seus olhos brilham com uma luz intensa quando revelam sua verdadeira natureza.",
    "Alguns anjos, como Castiel, desenvolvem empatia pelos humanos, enquanto outros seguem ordens divinas cegamente."],
    
    custom: [
    "Geralmente aparecem como humanos normais quando em vasos,",
    "mas em sua forma verdadeira são descritos como figuras radiantes com múltiplas asas, luz intensa,",
    "e formas incompreensíveis para olhos humanos — podendo cegar ou enlouquecer quem os vê."],

    behavior: [
    "Anjos seguem ordens da hierarquia celestial (Deus, Arcanjos, etc.),",
    "mas alguns se rebelam ou questionam seu propósito.",
    "São protetores, mas também podem ser impiedosos ao cumprir ordens divinas."],

    transformation: [
    "`Não há transformação comum de humano para anjo.",
    "Anjos são criados diretamente por Deus.",
    "No entanto, seres humanos podem ser usados como 'vasos' para que um anjo se manifeste na Terra,",
    "desde que deem consentimento explícito."],

    cure: [
    "Anjos feridos podem se recuperar com tempo, ou ao absorverem mais graça celestial.",
    "Não há 'cura' no sentido tradicional para um anjo corrompido — quando caem, tornam-se anjos caídos e perdem parte de seus poderes.",
    "Alguns podem tentar redenção, mas isso depende da vontade divina."],

    weaknesses: [
    "Símbolos de banimento angelical podem expulsá-los temporariamente de seus vasos.",
    "Lâminas angelicais (como a lâmina de um anjo) podem matá-los.",
    "Armas forjadas com metal celestial também são letais.",
    "Anjos podem ser presos em círculos de contenção específicos desenhados com símbolos enoqueanos.",
    "A 'Palavra de Deus' ou encantamentos antigos também podem influenciar ou controlar anjos, dependendo do contexto."],
   
    image: "http://localhost:3001/imagens/anjos.jpg",
  },
  { name: "Fantasma",
    banner: "http://localhost:3001/imagens/fantasmas.jpg",

    origin: [
        "Fantasmas são espíritos de pessoas que morreram, mas não seguiram adiante para o além.",
        "Geralmente estão presos ao mundo dos vivos por causa de emoções fortes, traumas, vingança ou assuntos inacabados."
    ],

    description: [
        ": `Fantasmas são manifestações espirituais que podem se tornar hostis ou até mortais.",
        "Eles costumam aparecer como versões deterioradas ou alteradas de sua aparência em vida.",
        "Podem manipular o ambiente (mexer objetos, causar quedas de temperatura, influenciar eletrônicos) e às vezes ferir fisicamente.",
        "Alguns são conscientes, outros repetem eventos de sua morte como ecos do passado."
    ],

    custom: [
        "Sua forma costuma ser translúcida ou sombria,",
        "às vezes aparecem como aparições completas, outras vezes como vultos, sombras ou distorções visuais.",
        "Podem se manifestar por vozes, gemidos, barulhos de passos ou gritos."
    ],

    behavior: [
        "Alguns fantasmas são apenas ecos (resquícios de energia),",
        "mas muitos têm consciência e podem se tornar vingativos ou agressivos.",
        "Costumam atacar pessoas ligadas ao seu passado ou que invadem o local onde morreram."
    ],

    transformation: [
        "`Fantasmas surgem após a morte de uma pessoa,",
        "geralmente quando há grande sofrimento, raiva ou apego ao mundo físico.",
        "Também podem ser criados por maldições, feitiços ou práticas necromânticas."
    ],

    cure: [
        "Queimar os restos mortais do fantasma geralmente resolve o caso, libertando o espírito.",
        "Destruir objetos ligados emocionalmente ao fantasma também pode ajudar (âncoras espirituais).",
        "Exorcismos, rituais ou símbolos sagrados podem expulsar ou conter fantasmas temporariamente."
    ],

    weaknesses: [
        "Sal pode ser usado para proteção ou barreiras contra fantasmas.",
        "Fantasmas evitam ferro (principalmente ferro consagrado ou ferro antigo).",
        "Queimar os ossos do espírito é o método mais eficaz para destruí-lo permanentemente.",
        "Símbolos sagrados e feitiços de banimento podem afastá-los ou imobilizá-los."
    ],
    
    image: "http://localhost:3001/imagens/fantasmas.jpg",
    }
];

module.exports = monstersList;
