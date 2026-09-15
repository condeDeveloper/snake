// Comida: posição livre aleatória, às vezes dourada
function spawnFood(snake) {
  const free = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (!snake.occupies({ x, y })) free.push({ x, y });
    }
  }
  if (!free.length) return null; // tabuleiro cheio: vitória
  const pos = free[Math.floor(Math.random() * free.length)];
  const gold = Math.random() < GOLD_CHANCE;
  return { ...pos, gold, value: gold ? 5 : 1, born: performance.now() };
}
