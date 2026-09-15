// Teclado, swipe e d-pad de toque
const KEYMAP = {
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
};

function bindInput(onDir, onPause, onAny) {
  window.addEventListener('keydown', e => {
    const dir = KEYMAP[e.code];
    if (dir) { e.preventDefault(); onAny(); onDir(dir); return; }
    if (e.code === 'Space' || e.code === 'KeyP' || e.code === 'Escape') { e.preventDefault(); onPause(); return; }
    if (e.code === 'Enter') onAny();
  });

  // d-pad
  document.querySelectorAll('#dpad button').forEach(b => {
    b.addEventListener('pointerdown', e => { e.preventDefault(); onAny(); onDir(b.dataset.dir); });
  });

  // swipe no canvas
  const canvas = document.getElementById('game');
  let start = null;
  canvas.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY }; onAny(); });
  canvas.addEventListener('pointerup', e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    start = null;
    if (Math.hypot(dx, dy) < 18) return;
    if (Math.abs(dx) > Math.abs(dy)) onDir(dx > 0 ? 'right' : 'left');
    else onDir(dy > 0 ? 'down' : 'up');
  });

  document.getElementById('overlay').addEventListener('pointerdown', e => { e.preventDefault(); onAny(); });
}
