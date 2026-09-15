// Estados, regras e loop
class Game {
  constructor() {
    this.ctx = document.getElementById('game').getContext('2d');
    this.el = {
      score: document.getElementById('score'),
      best: document.getElementById('best'),
      speed: document.getElementById('speed'),
      overlay: document.getElementById('overlay'),
    };
    this.best = Number(localStorage.getItem('snake-best') || 0);
    this.state = 'ready'; // ready | playing | paused | over
    this.reset();
    bindInput(d => this.onDir(d), () => this.togglePause(), () => this.onAny());
    this.last = performance.now();
    this.acc = 0;
    requestAnimationFrame(t => this.loop(t));
  }

  reset() {
    this.snake = new Snake();
    this.food = spawnFood(this.snake);
    this.score = 0;
    this.eaten = 0;
    this.speedLevel = 1;
    this.acc = 0;
    this.hud();
  }

  onAny() {
    if (this.state === 'ready') this.start();
    else if (this.state === 'over') { this.reset(); this.start(); }
    else if (this.state === 'paused') this.start();
  }
  onDir(dir) {
    if (this.state !== 'playing') return;
    this.snake.turn(dir);
    Sound.turn();
  }
  start() { this.state = 'playing'; this.el.overlay.classList.add('hidden'); }
  togglePause() {
    if (this.state === 'playing') { this.state = 'paused'; this.overlay('PAUSADO', 'Espaço ou toque para continuar'); }
    else if (this.state === 'paused') this.start();
    else this.onAny();
  }

  tick() {
    const head = this.snake.step();
    if (this.snake.hitsWall(head) || this.snake.hitsSelf()) return this.die();

    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      this.score += this.food.value;
      this.eaten++;
      this.snake.grow(this.food.gold ? 2 : 1);
      this.food.gold ? Sound.gold() : Sound.eat();
      const lvl = 1 + Math.floor(this.eaten / SPEED_STEP);
      if (lvl > this.speedLevel) { this.speedLevel = lvl; Sound.speed(); }
      this.food = spawnFood(this.snake);
      if (!this.food) return this.win();
      if (this.score > this.best) { this.best = this.score; localStorage.setItem('snake-best', this.best); }
      this.hud();
    }
  }

  die() {
    this.state = 'over';
    Sound.die();
    this.overlay('GAME OVER', `<span class="big">${this.score} pontos</span><br>Toque ou pressione uma tecla para jogar de novo`);
  }
  win() {
    this.state = 'over';
    this.overlay('VOCÊ VENCEU!', `<span class="big">${this.score} pontos</span><br>Preencheu o tabuleiro inteiro`);
  }

  loop(now) {
    const dt = Math.min(200, now - this.last);
    this.last = now;
    if (this.state === 'playing') {
      this.acc += dt;
      const step = tickFor(this.speedLevel);
      while (this.acc >= step && this.state === 'playing') { this.acc -= step; this.tick(); }
    }
    drawScene(this.ctx, this.snake, this.food, now);
    requestAnimationFrame(t => this.loop(t));
  }

  hud() {
    this.el.score.textContent = this.score;
    this.el.best.textContent = this.best;
    this.el.speed.textContent = this.speedLevel;
  }
  overlay(title, html) {
    this.el.overlay.innerHTML = `<h1>${title}</h1><p>${html}</p>`;
    this.el.overlay.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
