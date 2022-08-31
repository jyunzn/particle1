class Main {
  constructor({ clazz, rdeg }) {
    this.el = document.querySelector(clazz);
    this.ctx = this.el.getContext("2d");
    this.ww = 0;
    this.wh = 0;

    this.rdeg = rdeg;
    this.deg = 360 / rdeg;

    this.points = [];

    this.time = 0;
  }

  initCv() {
    this.ww = this.el.width = window.innerWidth;
    this.wh = this.el.height = window.innerHeight;
  }

  initPoints() {
    const points = [];

    for (let i = 0; i < this.rdeg; i++) {
      points.push([]);

      let tempnum = 50;
      for (let j = 0; j < 10 + Math.random() * 10; j++) {
        points[i].push(new Point(tempnum));
        tempnum = lerp(tempnum, 0, 0.1);
      }
    }

    this.points = points;
  }

  load() {
    this.initCv();
    this.init();
    this.draw();
  }

  init() {
    this.initPoints();
  }

  updatePointData() {
    this.points.forEach((pline) => {
      pline.forEach((p) => p.update(this.time));
    });
  }

  updateTime() {
    this.time++;
  }

  update() {
    this.updatePointData();
    this.updateTime();
  }

  draw() {
    const ctx = this.ctx;
    const ww = this.ww;
    const wh = this.wh;

    ctx.fillStyle = "rgba(0,0, 0, .6)";
    ctx.fillRect(0, 0, ww, wh);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(ww / 2, wh / 2);

    this.points.forEach((pline) => {
      pline.forEach((p) => p.draw(ctx));
      ctx.rotate(toRadian(m.deg));
    });
    ctx.restore();

    this.update();
    requestAnimationFrame(() => this.draw());
  }
}
