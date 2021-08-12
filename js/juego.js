var canvas;
var ctx;
var FPS = 60;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var protagonista;

var enemigo = [];

var imagenAntorcha;

var tileMap;

var musica, sonido1, sonido2, sonido3;

var nivel = 1;
var nivelProgres;

var stiloMapa = localStorage.getItem("stiloMapa");



//Traer sonidos
musica = new Howl({
  src: ["music/rainy_city.wav"],
  loop: true,
  volume: 0.5
});
sonido1 = new Howl({
  src: ["sounds/1.mp3"], //muerte
  loop: false,

});
sonido2 = new Howl({
  src: ["sounds/coin.wav"], //llave
  loop: false,

});
sonido3 = new Howl({
  src: ["sounds/Win.wav"], //Pasamos de nivel
  loop: false,

});



//! Escenarios

var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var escenario1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Ariel Omar Méndez Valverde
var escenario2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 0, 3, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var escenario3 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 3, 0],
  [0, 0, 2, 0, 0, 1, 0, 0, 2, 2, 2, 2, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Niveles de Gustavo Hernández
var escenario4 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 1, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0],
  [0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var escenario5 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 0, 2, 0, 3, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 1, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


//Niveles Jesica Maqueda

var escenario6 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 3, 0],
  [0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0],
  [0, 1, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var escenario7 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
  [0, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0],
  [0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 3, 0],
  [0, 2, 2, 2, 1, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


//Niveles de  Cinthia Guadalupe Soto Rodriguez. 
var escenario8 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0],
  [0, 2, 2, 0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];

var escenario9 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0],
  [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 1, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var escenario10 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0],
  [0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0],
  [0, 3, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var escenario11 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 2, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 1],
  [0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0],
  [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 2, 0, 0, 2, 2, 3, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario12 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 0],
  [0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 1],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario13 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0],
  [0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 3, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario14 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 2, 3, 0, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario15 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 0],
  [0, 0, 2, 3, 0, 0, 2, 0, 1, 2, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario16 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
  [0, 2, 0, 1, 2, 2, 2, 2, 2, 2, 0, 2, 2, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario17 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 1, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 3, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario18 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 0, 2, 2, 1, 0, 3, 2, 2, 0, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

/*--------------------------Termianan niveles-------------------*/
function dibujaEscenario() {


  //casos para cada escenario por nivel
  switch (nivel) {
    case 1:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario1;
      document.getElementById('nivel').innerHTML = nivel;
      /*  document.getElementById('nivel').innerHTML=nivel; */
      break;
    case 2:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario2;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 3:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario3;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 4:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario4;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 5:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario5;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 6:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario6;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 7:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario7;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 8:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario8;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 9:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario9;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 10:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario10;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 11:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario11;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 12:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario12;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 13:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario13;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 14:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario14;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 15:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario15;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 16:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario16;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 17:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario17;
      document.getElementById('nivel').innerHTML = nivel;
      break;
    case 18:
      document.getElementById('nivelProgress').setAttribute('value', nivel);
      escenario = escenario18;
      document.getElementById('nivel').innerHTML = nivel;
      break;

    default:
      alert("LLegaste final, has gando!!!");
      break;
  }
  console.log("NIVEL: " + nivel);
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {

      var tile = escenario[y][x];
      ctx.drawImage(tileMap, tile * 32, 0, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
    }
  }
}


var antorcha = function (x, y) {
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; //0-3


  this.cambiaFotograma = function () {
    if (this.fotograma < 3) {
      this.fotograma++;
    } else {
      this.fotograma = 0;
    }

  }


  this.dibuja = function () {

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap, this.fotograma * 32, 64, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
  }

}




//CLASE ENEMIGO
var malo = function (x, y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random() * 4);

  this.retraso = 50;
  this.fotograma = 0;


  this.dibuja = function () {

    switch (nivel) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        ctx.drawImage(tileMap, 64, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        ctx.drawImage(tileMap, 96, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
       

        break;

      default:
        break;
    }
    /* ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF); */
  }


  this.compruebaColision = function (x, y) {
    var colisiona = false;

    if (escenario[y][x] == 0) {
      colisiona = true;
    }
    return colisiona;
  }


  this.mueve = function () {

    protagonista.colisionEnemigo(this.x, this.y);


    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      //ARRIBA
      if (this.direccion == 0) {
        if (this.compruebaColision(this.x, this.y - 1) == false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }


      //ABAJO
      if (this.direccion == 1) {
        if (this.compruebaColision(this.x, this.y + 1) == false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 2) {
        if (this.compruebaColision(this.x - 1, this.y) == false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 3) {
        if (this.compruebaColision(this.x + 1, this.y) == false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }

  }

}


//OBJETO JUGADOR
var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;


  this.dibuja = function () {
    ctx.drawImage(tileMap, 32, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
  }


  this.colisionEnemigo = function (x, y) {
    if (this.x == x && this.y == y) {
      this.muerte();
    }

  }


  this.margenes = function (x, y) {
    var colision = false;

    if (escenario[y][x] == 0) {
      colision = true;
    }

    return (colision);
  }



  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) {
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
      this.logicaObjetos();
    }
  }


  this.victoria = function () {
    console.log('Has ganado!');

    this.x = 1;
    this.y = 1;

    this.llave = false; //el jugador ya no tiene la llave
    nivel++;
    //escenario[8][3] = 3; //volvemos a poner la llave en su sitio
  }


  this.muerte = function () {
    console.log('Has perdido!');

    setTimeout("sonido1.play();", 0.1 * 1000);
    setTimeout("location.reload();", 0.6 * 1000);

    if (nivel > recuperar()) {
      guardar(nivel);
    }

    this.x = 1;
    this.y = 1;

    nivel = 1;



    this.llave = false; //el jugador ya no tiene la llave
    escenario[8][3] = 3; //volvemos a poner la llave en su sitio
  }




  this.logicaObjetos = function () {
    var objeto = escenario[this.y][this.x];

    //OBTIENE llave
    if (objeto == 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      console.log('Has obtenido la llave!!');
      sonido2.play();
    }



    //ABRIMOS LA PUERTA
    if (objeto == 1) {
      if (this.llave == true) {
        this.victoria();
        sonido3.play();

      } else {
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

}




//TODO: Cambiar tileMap cada 5 niveles (dejar que el jugador escoja el estilo)

//TODO: contexto del juego (historia) e istrucciones detalladas
//TODO: pwa
//TODO: cambiar hubicacion del prota segun el nivel
//TODO: cambiar hubicacion de los enemigos segun el nivel

/*----------------------------------------------------------------------------*/

//TODO: Opcional! respuesta aptica del juego (vibración del móvil)
//TODO: Opcional! Guardar estado del juego
//TODO: Opcional! animar al prota y a los enemigos
//TODO: Opcional! atarldapo a movil: botones para movil, gestos de pantalla y limitar uso en horizontal


function cambiaStilo(tile) {
  switch (tile) {

    case 1:
      stiloMapa = 'img/tilemap.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;

    case 2:
      stiloMapa = 'img/tilemap2.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;

    case 3:
      stiloMapa = 'img/tilemap3.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;

    case 4:
      stiloMapa = 'img/tilemap4.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;

    case 5:
      stiloMapa = 'img/tilemap5.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;
    case 6:
      stiloMapa = 'img/tilemap6.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;
    case 7:
      stiloMapa = 'img/tilemap7.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;
    case 8:
      stiloMapa = 'img/tilemap8.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;
    case 9:
      stiloMapa = 'img/tilemap9.png';
      localStorage.setItem("stiloMapa", stiloMapa);
      tileMap = new Image();
      tileMap.src = stiloMapa;
      borraCanvas();
      dibujaEscenario();
      imagenAntorcha.dibuja();
      imagenAntorcha2.dibuja();
      imagenAntorcha3.dibuja();
      imagenAntorcha4.dibuja();
      protagonista.dibuja();

      break;




    default:
      break;
  }

}



function inicializa() {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  document.getElementById('maxProgress').setAttribute('value', localStorage.getItem('max'));




  //Musica
  //musica.play();

  if (localStorage.getItem("stiloMapa") == null) {
    stiloMapa = 'img/tilemap5.png';
  }

  tileMap = new Image();





  tileMap.src = stiloMapa;




  //cargamos nivel maximo
  var recuperado;
  if (localStorage.getItem("max") == undefined) {

    document.getElementById('maximo').innerHTML = 0;

  } else {
    recuperado = recuperar();
    document.getElementById('maximo').innerHTML = recuperado;
  }



  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  //CREAMOS LA antorcha
  imagenAntorcha = new antorcha(0, 0);
  imagenAntorcha2 = new antorcha(14, 0);
  imagenAntorcha3 = new antorcha(0, 9);
  imagenAntorcha4 = new antorcha(14, 9);

  //CREAMOS LOS ENEMIGOS
  enemigo.push(new malo(3, 3));
  enemigo.push(new malo(5, 7));
  enemigo.push(new malo(7, 7));

  //LECTURA DEL TECLADO
  document.addEventListener('keydown', function (tecla) {

    if (tecla.keyCode == 38) {
      protagonista.arriba();
    }

    if (tecla.keyCode == 40) {
      protagonista.abajo();
    }

    if (tecla.keyCode == 37) {
      protagonista.izquierda();
    }

    if (tecla.keyCode == 39) {
      protagonista.derecha();
    }

  });

  setInterval(function () {
    principal();
  }, 1000 / FPS);
}


//guardado
function guardar(nivel) {
  localStorage.setItem("max", nivel);
}

//recuperado
function recuperar() {
  return (localStorage.getItem("max"));

}


function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}


function principal() {
  borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  imagenAntorcha2.dibuja();
  imagenAntorcha3.dibuja();
  imagenAntorcha4.dibuja();
  protagonista.dibuja();


  for (c = 0; c < enemigo.length; c++) {
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }

}













