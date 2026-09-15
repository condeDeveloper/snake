// Desenho no canvas
function drawScene(ctx, snake, food, t) {
  const S = GRID * CELL;
  ctx.clearRect(0, 0, S, S);

  // grade sutil
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let i = 1; i < GRID; i++) {
    ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(S, i * CELL); ctx.stroke();
  }

  if (food) drawFood(ctx, food, t);
  drawSnake(ctx, snake);
}

function drawFood(ctx, food, t) {
  const cx = food.x * CELL + CELL / 2, cy = food.y * CELL + CELL / 2;
  const pulse = 1 + Math.sin((t - food.born) / 150) * 0.08;
  const r = (CELL / 2 - 3) * pulse;
  ctx.save();
  ctx.shadowBlur = 14;
  ctx.shadowColor = food.gold ? COLORS.gold : COLORS.food;
  ctx.fillStyle = food.gold ? COLORS.gold : COLORS.food;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  // brilho
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.beginPath(); ctx.arc(cx - r * 0.35, cy - r * 0.35, r * 0.28, 0, Math.PI * 2); ctx.fill();
}

function drawSnake(ctx, snake) {
  const n = snake.segments.length;
  // corpo: do rabo para a cabeça, com gradiente de cor e leve afinamento
  for (let i = n - 1; i >= 0; i--) {
    const s = snake.segments[i];
    const k = i / Math.max(1, n - 1);        // 0 = cabeça, 1 = rabo
    const inset = 1 + k * 3;
    ctx.fillStyle = i === 0 ? COLORS.head : lerpColor(COLORS.body, COLORS.tail, k);
    roundRect(ctx, s.x * CELL + inset, s.y * CELL + inset, CELL - inset * 2, CELL - inset * 2, 5);
  }
  // olhos na cabeça, virados para a direção atual
  const h = snake.head, d = DIRS[snake.dir];
  const cx = h.x * CELL + CELL / 2, cy = h.y * CELL + CELL / 2;
  const px = -d.y, py = d.x;   // perpendicular
  ctx.fillStyle = COLORS.eye;
  for (const side of [-1, 1]) {
    const ex = cx + d.x * 4 + px * side * 4;
    const ey = cy + d.y * 4 + py * side * 4;
    ctx.beginPath(); ctx.arc(ex, ey, 2.2, 0, Math.PI * 2); ctx.fill();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = s => [(s >> 16) & 255, (s >> 8) & 255, s & 255];
  const [r1, g1, b1] = ch(pa), [r2, g2, b2] = ch(pb);
  const m = (u, v) => Math.round(u + (v - u) * t);
  return `rgb(${m(r1, r2)},${m(g1, g2)},${m(b1, b2)})`;
}
