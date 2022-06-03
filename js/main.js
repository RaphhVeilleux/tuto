


class Sprite{
  constructor(img, largeur, hauteur, nbrImagesHoriz, nbrImagesVert){
    this.image = img;
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.nbrImagesHoriz =nbrImagesHoriz;
    this.nbrImagesVert = nbrImagesVert;
  }
}

function creerObstacle(){
 let grosseurDeObstacle = entierAleatoire(40, 100);
 //console.log(grosseurDeObstacle)
 let typeDeObstacle = entierAleatoire(0, 1);
 let obstacle = new Cactus(imageCactus, canvas.width + grosseurDeObstacle, canvas.height - grosseurDeObstacle, grosseurDeObstacle * 0.6, grosseurDeObstacle);

 if (typeDeObstacle == 1) {
   obstacle.y = obstacle.y - (joueur.hauteurOriginelle - 30);

   obstacle.img = imageTyro;
   obstacle.x = canvas.width + 40;
   obstacle.l = 40;
   obstacle.h = 25;
 }
 obstacles.push(obstacle);
}

function entierAleatoire(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function demarrer(){
  //dimensions du canvas
  canvas.width = window.innerWidth / 1.5;
  canvas.height = window.innerHeight / 1.5;

  c.font = "20px sans-serif"; //police globale du canvas

  vitesseDuJeu = 3;
  gravité = 1;

  points = 0;
  meilleurScore = 0;

  spriteDino = new Sprite(imageDino, 357, 383, 1, 1);
  joueur = new Dino(imageDino, 25, 0, 50, 50);

  texteDesPoints = new Text("Points: " + points, 25, 25, "left", "Black", "20");

  requestAnimationFrame(animate);
}

let délaisDeApparitionInitial = 200;
let délaisDeApparition = délaisDeApparitionInitial;

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  délaisDeApparition--;
  if (délaisDeApparition <= 0) {
    creerObstacle();
    console.log(obstacles);
    délaisDeApparition = délaisDeApparitionInitial - vitesseDuJeu * 8;

    if (délaisDeApparition < 60) {
      délaisDeApparition = 60;
    }
  }
  console.log(délaisDeApparition);

  //creer les ennemis
  for (var i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];

    //supprimer les obstacles une fois qu'ils sont hors du canvas
    if (obs.x + obs.l < 0) {
      obstacles.splice(i, 1);
    }

    if (joueur.x < obs.x + obs.l && joueur.x + joueur.l > obs.x && joueur.y < obs.y + obs.h && joueur.y + joueur.h > obs.y) {
    obstacles = [];//Vide l'array contenant les obstacles
    délaisDeApparition = délaisDeApparitionInitial;
    vitesseDuJeu = 3;
    audi.play();
    setTimeout( function(){
      alert("GAME OVER!");
      points = 0;
    }, 3000);

    }

    obs.deplacer();
  }

  joueur.animer();

  points++;
  texteDesPoints.t = "Points: " + points;
  texteDesPoints.dessiner();

  vitesseDuJeu += 0.003;
}

//Variables globales
const canvas = document.getElementById('jeu');
const c = canvas.getContext('2d');

var aud = document.getElementById('abc');
var audi = document.getElementById('def');
var imageDino = document.getElementById('img-dino');
var imageTyro = document.getElementById('img-tyro');
var imageCactus = document.getElementById('img-cactus');

let score;
let meilleurScore;
let joueur;
let gravité;
let obstacles = [];
let vitesseDuJeu;
let touches = {}; //objet
let points;
let texteDesPoints;
let spriteDino;


//Event listeners
document.addEventListener('keydown', function(event){
  touches[event.code] = true;
  console.log(event.code);

});
document.addEventListener('keyup', function(event){
  touches[event.code] = false;

});
 //Résumé: si une touche est pressée(keydown), cette touche devient true, et si un touche est relaché(keyup), cette touche devient false donc plus aucune action concernant cette touche peut se produire


demarrer();
