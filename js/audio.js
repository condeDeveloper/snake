// Sons sintetizados com WebAudio
const Sound = (() => {
  let ctx;
  function tone(freq, dur, type = 'square', vol = 0.05) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  return {
    eat:  () => tone(660, 0.07, 'triangle', 0.07),
    gold: () => [660, 880, 1100].forEach((f, i) => setTimeout(() => tone(f, 0.1, 'triangle', 0.08), i * 60)),
    turn: () => tone(200, 0.02, 'square', 0.015),
    speed:() => [523, 659].forEach((f, i) => setTimeout(() => tone(f, 0.12, 'square', 0.05), i * 90)),
    die:  () => [300, 220, 150, 90].forEach((f, i) => setTimeout(() => tone(f, 0.22, 'sawtooth', 0.07), i * 120)),
  };
})();
