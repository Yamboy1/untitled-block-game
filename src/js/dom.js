export class DomController {
  /** @type {HTMLSpanElement} */
  #scoreElement

  /** @type {HTMLSpanElement} */
  #linesElement

  /** @type {HTMLSpanElement} */
  #levelElement

  /**
   * @param scoreElement {HTMLSpanElement}
   * @param linesElement {HTMLSpanElement}
   * @param levelElement {HTMLSpanElement}
   */
  constructor({ scoreElement, linesElement, levelElement }) {
    this.#scoreElement = scoreElement;
    this.#linesElement = linesElement;
    this.#levelElement = levelElement;
  }

  /** @param score {number} */
  displayScore(score) {
    this.#scoreElement.innerText = `${score}`;
  }

  /** @param lines {number} */
  displayLines(lines) {
    this.#linesElement.innerText = `${lines}`;
  }

  /** @param level {number} */
  displayLevel(level) {
    this.#levelElement.innerText = `${level}`;
  }
}
