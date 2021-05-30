import { Game } from "./game.js";
import { createContext, createElements, getElements } from "./helpers.js";

createElements(document.getElementById("container"));

const { canvas, start, level: levelElement, lines: linesElement, score: scoreElement, color1, color2, twoColor } = getElements();

const ctx = createContext(canvas);


if (ctx !== null) {
  console.log(ctx);
  let game;
  start.addEventListener("click", () => {
    game = new Game(ctx, { levelElement, linesElement, scoreElement }, twoColor.checked ? [color1.value, color2.value] : []);
    game.run();
  });
}

