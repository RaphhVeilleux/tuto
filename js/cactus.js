class Cactus {
  constructor(img, x, y, l, h){
    this.img = img;
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    //this.c = c;

    this.dx = -vitesseDuJeu;
  }

  deplacer(){
    this.x = this.x + this.dx;
    this.dessiner();
    this.dx = -vitesseDuJeu;
  }

  dessiner(){
    c.drawImage(this.img, this.x, this.y, this.l, this.h)
    /*c.beginPath();
    c.fillStyle = this.c;
    c.fillRect(this.x, this.y, this.l, this.h);
    c.closePath();*/
  }
}
