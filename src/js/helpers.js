/**
 * Create a canvas context given an html element
 * @param element {HTMLCanvasElement}
 * @returns {CanvasRenderingContext2D|null}
 */
export function createContext(element) {
  if (element instanceof HTMLCanvasElement) {
    return element.getContext?.("2d") ?? null;
  }
}

/**
 *
 * @param parentElement {HTMLElement}
 */
export function createElements(parentElement) {
  parentElement.innerHTML =
    `
    <div id="main-game">
      <canvas id="canvas" width="200" height="400"></canvas>
      <br>
      <button id="start">Start</button>
      <br>
      <p>
        <label for="level">Level: </label><span id="level"></span>
      </p>
      <p>
        <label for="lines">Lines: </label><span id="lines"></span>
      </p>
      <p>
        <label for="score">Score: </label><span id="score"></span>
      </p> 
    </div>
    <div id="two-color-div">
      <p>
        <label for="two-color">Two Color Mode:</label><input type="checkbox" id="two-color">
      </p>
      <p>
        <label for="color1">Color 1: </label><input type="color" id="color1">
      </p>
      <p>
        <label for="color2">Color 2: </label><input type="color" id="color2">
      </p>
    </div>
    `
}

export function getElements() {
  const canvas = document.getElementById("canvas");
  const start = document.getElementById("start");
  const level = document.getElementById("level");
  const lines = document.getElementById("lines");
  const score = document.getElementById("score");
  const twoColor = document.getElementById("two-color");
  const color1 = document.getElementById("color1");
  const color2 = document.getElementById("color2");

  return { canvas, start, level, lines, score, twoColor, color1, color2 };
}
