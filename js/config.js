// Constantes do jogo
const GRID = 24;          // células por lado
const CELL = 20;          // px por célula (canvas 480x480)
const START_LEN = 4;
const BASE_TICK = 140;    // ms por passo no nível 1
const MIN_TICK = 55;
const SPEED_STEP = 5;     // a cada N comidas a velocidade sobe
const GOLD_CHANCE = 0.12; // chance de a comida ser dourada (vale 5)

const DIRS = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1 },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };

const COLORS = {
  grid: 'rgba(255,255,255,.035)',
  head: '#86efac',
  body: '#4ade80',
  tail: '#22c55e',
  eye: '#052e16',
  food: '#f87171',
  gold: '#fbbf24',
};

function tickFor(speedLevel) {
  return Math.max(MIN_TICK, BASE_TICK - (speedLevel - 1) * 12);
}
