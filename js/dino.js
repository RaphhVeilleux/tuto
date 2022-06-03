class Dino {
  constructor(img, x, y, l, h){
    this.img = img;
    this.x = x;
    this.y = y;
    this.l = l; //largeur
    this.h = h; //hauteur
//    this.c = c; //couleur

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
      aud.play();
    } else if (this.tempsDuSaut > 0 && this.tempsDuSaut < 10) {
      this.tempsDuSaut++;
      this.dy = -this.forceDuSaut /*mettre en com?*/- (this.tempsDuSaut / 50);;
      aud.currentTime = 0;
    }
  }
  //Résumé de la fonction sauter:
  //si le dino est au sol, le dino aumente de hauteur(dy) jusqu'a temps que
  // 15 frames se soient écoulés; à ce moment-ci la fonction sauter ne respecte plus
  //les conditions et donc et s'arrête et le dino redescent à l'aide du if else créé avant


  dessiner(){
    c.drawImage(this.img, this.x, this.y, this.l, this.h)
    /*c.beginPath();
    c.fillStyle = this.c;
    c.fillRect(this.x, this.y, this.l, this.h);
    c.closePath();*/
  }
}
