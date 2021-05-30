export class RotateClockwiseController {
  #prevPressed = false;

  getInput(delta, { upArrow }) {
    let rotateClockwise = false;
    if (upArrow && !this.#prevPressed) {
      rotateClockwise = true;
    }

    this.#prevPressed = upArrow;

    return { rotateClockwise };
  }
}
