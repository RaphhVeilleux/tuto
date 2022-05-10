const canvas = document.getElementById('jeu');
const c = canvas.getContext('2d');

//Variables globales
let score;
let meilleurScore;
let joueur;
let gravité; //gravité
let obstacles = [];
let vitesseDuJeu;
let touches = {};

//Event listeners
document.addEventListener('keydown', function(event){
  touches[event.code] = true;
  console.log(event.code);
});
document.addEventListener('keyup', function(event){
  touches[event.code] = false;
});
 //Résumé: si une touche est pressée(keydown), cette touche devient true, et si un touche est relaché(keyup), cette touche devient false donc plus aucune action concernant cette touche peut se produire

class Dino {
  constructor(x, y, l, h, c){
    this.x = x;
    this.y = y;
    this.l = l; //largeur
    this.h = h; //hauteur
    this.c = c; //couleur

    this.dy = 0;
    this.forceDuSaut = 15;
    this.hauteurOriginelle = h;
    this.auSol = false;
    this.tempsDuSaut = 0;
  }

  animer(){
    //Saut
    if (touches['Space']) {
      console.log('Saut!');
      this.sauter();
    } else {
      this.tempsDuSaut = 0;
    }

    //Accroupir
    if (touches['ArrowDown']) {
      console.log('Accroupir');
      this.h = this.hauteurOriginelle / 2;
    } else {
      this.h = this.hauteurOriginelle;
    }

    this.y = this.y + this.dy;

    //Faire redescendre le dino
    if (this.y + this.h < canvas.height) {
      this.dy = this.dy + gravité;
      this.auSol = false;
    } else {
      this.dy = 0;
      this.auSol = true;
      this.y = canvas.height - this.h;
    }

    this.dessiner();
  }

  sauter(){
    console.log( this.auSol, this.tempsDuSaut)
    if (this.auSol && this.tempsDuSaut == 0) {
      this.tempsDuSaut = 1;
      this.dy = -this.forceDuSaut; //cahnger force duSaut par -15?
    } else if (this.tempsDuSaut > 0 && this.tempsDuSaut < 10) {
      this.tempsDuSaut++;
      this.dy = -this.forceDuSaut /*mettre en com?*/- (this.tempsDuSaut / 50)
    }
  }
  //Résumé de la fonction sauter:
  //si le dino est au sol, le dino aumente de hauteur(dy) jusqu'a temps que
  // 15 frames se soient écoulés; à ce moment-ci la fonction sauter ne respecte plus
  //les conditions et donc et s'arrête et le dino redescent à l'aide du if else créé avant


  dessiner(){
    c.beginPath();
    c.fillStyle = this.c;
    c.fillRect(this.x, this.y, this.l, this.h);
    c.closePath();
  }
}

class Cactus {
  constructor(x, y, l, h, c){
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.c = c;

    this.dx = -vitesseDuJeu;
  }

  deplacer(){
    this.x = this.x + this.dx;
    this.dessiner();
    this.dx = -vitesseDuJeu;
  }

  dessiner(){
    c.beginPath();
    c.fillStyle = this.c;
    c.fillRect(this.x, this.y, this.l, this.h);
    c.closePath();
  }
}


function creerObstacle(){
 let grosseurDeObstacle = entierAleatoire(30, 80);
 //console.log(grosseurDeObstacle)
 let typeDeObstacle = entierAleatoire(0, 1);
 let obstacle = new Cactus( canvas.width + grosseurDeObstacle, canvas.height - grosseurDeObstacle, grosseurDeObstacle * 0.6, grosseurDeObstacle, "Green");

 if (typeDeObstacle == 1) {
   obstacle.y -= joueur.hauteurOriginelle - 30;

   obstacle.x = canvas.width + 40;
   obstacle.l = 40;
   obstacle.h = 25;
   obstacle.c = "Red";
 }
 obstacles.push(obstacle);
}

function entierAleatoire(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function demarrer(){
  //dimensions du canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  c.font = "20px sans-serif"; //police globale du canvas

  vitesseDuJeu = 3;
  gravité = 1;

  score = 0;
  meilleurScore = 0;

  joueur = new Dino(25, 0, 50, 50 , "Grey");

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

  //creer les ennemis
  for (var i = 0; i < obstacles.length; i++) {
    let o = obstacles[i]
    o.deplacer();
  }

  joueur.animer();

}

demarrer();
