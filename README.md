# 🐍 Snake

Jogo da cobrinha em HTML5 Canvas + JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/snake/

## Rodar local

```bash
npx serve -l 5182 .
```

## Controles

| Ação   | Tecla / gesto                       |
|--------|-------------------------------------|
| Mover  | Setas, WASD, swipe ou d-pad         |
| Pausar | Espaço, P ou Esc                    |

## Funcionalidades

- Grade 24×24 com cobra que ganha cor e afina em direção ao rabo
- Olhos que acompanham a direção
- Comida normal (1 ponto) e **dourada** (5 pontos, cresce o dobro)
- Velocidade sobe a cada 5 comidas
- Fila de direções para curvas rápidas sem perder input
- Vitória ao preencher o tabuleiro inteiro
- Recorde no `localStorage`, sons via WebAudio
- Swipe e d-pad no celular

## Estrutura

```
js/config.js   # constantes, cores, velocidade
js/snake.js    # modelo da cobra
js/food.js     # geração de comida
js/render.js   # desenho
js/audio.js    # sons
js/input.js    # teclado, swipe, d-pad
js/game.js     # estados e loop
```

## Licença

MIT
