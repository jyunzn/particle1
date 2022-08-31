class Point {
  constructor(lernum) {
    this.min = 50 + Math.random() * 30;
    this.pos = this.min;
    this.freq = Math.random() * 20 + lernum;
    this.amp = Math.random() * 0.03 + 0.05;
  }

  update(time) {
    this.pos = this.min + Math.abs(Math.sin(time * this.amp) * this.freq);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos, 0, 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}
