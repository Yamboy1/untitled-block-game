export class LeftRightInputController {
  /** @type {"Left" | "Right" | null} */
  #prevDirection = null

  #bothKeysAlreadyPressed = false;

  #DAS = 200;
  #ARR = 100;

  #arrTimer = 0;

  /**
   * @type {"Left" | "Right" | null}
   */
  #dasDirection;

  #dasTimer = 0;

  /**
   * Returns "Left", "Right" or null, depending on whether
   * there is a left, right or no input respectively.
   * @returns {"Left" | "Right" | null}
   */
  #getDirection({ leftArrow, rightArrow }) {
    let direction;

    if (!leftArrow && !rightArrow) {
      direction = null;
    } else if (leftArrow && !rightArrow) {
      direction = "Left";
    } else if (rightArrow && !leftArrow) {
      direction = "Right";
    } else if (this.#bothKeysAlreadyPressed) {
      direction = this.#prevDirection;
    } else {
      direction = this.#prevDirection === "Left" ? "Right" : "Left";
    }

    this.#prevDirection = direction;
    this.#bothKeysAlreadyPressed = leftArrow && rightArrow;
    return direction;
  }

  /**
   * Get the left / right input at the current point in time, using
   * delta to calculate DAS (and soon ARR)
   * @param arrows {{leftArrow: boolean, rightArrow: boolean}}
   * @param delta {number}
   * @returns {{left: boolean, right: boolean}}
   */
  getInput(delta, arrows) {
    const direction = this.#getDirection(arrows);

    if (direction === null) {
      this.#dasDirection = null;
      this.#dasTimer = 0;
    } else if (direction !== this.#dasDirection) {
      this.#dasDirection = direction
      this.#dasTimer = 0;

      return direction === "Left" ? { left: true, right: false } : { right: true, left: false }
    } else if (this.#dasTimer < this.#DAS) {
      this.#dasTimer += delta;
    }

    if (this.#dasDirection !== null && this.#dasTimer >= this.#DAS)
      if (this.#arrTimer >= this.#ARR) {
        this.#arrTimer -= this.#ARR;

        return direction === "Left" ? {left: true, right: false} : {right: true, left: false}
      } else {
        this.#arrTimer += delta;
      }
    return { left: false, right: false }
  }
}
