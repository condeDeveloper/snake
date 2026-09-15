// Modelo da cobra: segmentos, direção e movimento
class Snake {
  constructor() {
    const cx = Math.floor(GRID / 2), cy = Math.floor(GRID / 2);
    this.segments = [];
    for (let i = 0; i < START_LEN; i++) this.segments.push({ x: cx - i, y: cy });
    this.dir = 'right';
    this.queue = [];      // direções pendentes (permite curvas rápidas)
    this.growth = 0;
  }

  get head() { return this.segments[0]; }

  // Enfileira uma direção, ignorando inversões e repetições
  turn(dir) {
    const last = this.queue.length ? this.queue[this.queue.length - 1] : this.dir;
    if (dir === last || dir === OPPOSITE[last]) return;
    if (this.queue.length < 2) this.queue.push(dir);
  }

  // Avança um passo. Retorna a nova cabeça (antes de checar colisões).
  step() {
    if (this.queue.length) this.dir = this.queue.shift();
    const d = DIRS[this.dir];
    const next = { x: this.head.x + d.x, y: this.head.y + d.y };
    this.segments.unshift(next);
    if (this.growth > 0) this.growth--;
    else this.segments.pop();
    return next;
  }

  grow(n = 1) { this.growth += n; }

  hitsWall(p) { return p.x < 0 || p.y < 0 || p.x >= GRID || p.y >= GRID; }

  // Colide com o próprio corpo (ignora a cabeça)
  hitsSelf() {
    const h = this.head;
    return this.segments.some((s, i) => i > 0 && s.x === h.x && s.y === h.y);
  }

  occupies(p) { return this.segments.some(s => s.x === p.x && s.y === p.y); }
}
