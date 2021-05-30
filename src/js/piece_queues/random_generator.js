export class RandomGenerator {
  /** The set of values to select from
   * @readonly
   * @type []
   */
  #values;

  constructor(values) {
    this.#values = values;
  }

  next() {
    const index = Math.floor(Math.random() * this.#values.length);
    return this.#values[index];
  }
}
