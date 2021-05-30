export class DownController {
  #MS_PER_ROW_FALLEN = 50;
  #downTimer = 0;

  getInput(delta, { downArrow }) {
    let down = false;
    if (this.#downTimer >= this.#MS_PER_ROW_FALLEN) {
      if (downArrow) {
        this.#downTimer -= this.#MS_PER_ROW_FALLEN;
        down = true
      }
    } else {
      this.#downTimer += delta;
    }

    return { down };
  }
}
