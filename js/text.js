class Text{
  constructor(t, x, y, a, c, s){
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }
  dessiner(){
    c.beginPath();
    c.fillStyle = this.c;
    c.font = this.s + "px sans-serif";
    c.textAlign = this.a;
    c.fillText(this.t, this.x, this.y);
    c.closePath();
  }
}
