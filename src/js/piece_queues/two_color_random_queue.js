import { IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece } from "../piece.js";
import { RandomGenerator } from "./random_generator.js";

export class TwoColorRandomPieceQueue {
  #pieceGenerator = new RandomGenerator([IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece])

  #colorGenerator;

  // noinspection JSMismatchedCollectionQueryUpdate
  #queue = [];

  constructor(length, colors) {
    this.#colorGenerator = new RandomGenerator(colors);
    for (let i = 0; i < length; i++) {
      this.#queue.unshift(this.getNextPiece());
    }
  }

  *[Symbol.iterator]() {
    while (true) {
      this.#queue.pop();
      this.#queue.unshift(this.getNextPiece());
      yield this.#queue;
    }
  }

  getNextPiece() {
    const color = this.#colorGenerator.next();
    return new (this.#pieceGenerator.next())(color)
  }

  next() {
    return this[Symbol.iterator]().next().value;
  }
}


