export class RecurringTimer {
  /** @type {number} */
  #maxTime;

  /** @type {number} */
  #time = 0;

  /** @param maxTime {number} The time in milliseconds that the timer counts to */
  constructor(maxTime) {
    this.#maxTime = maxTime;
  }
  hasPassedTime(delta, { condition = true } = {} ) {
    if (this.#time >= this.#maxTime) {
      if (condition) {
        this.#time -= this.#maxTime;
        return true
      }
    } else {
      this.#time += delta;
    }
    return false;
  }
}

