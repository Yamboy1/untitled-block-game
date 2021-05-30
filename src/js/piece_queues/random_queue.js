import { IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece } from "../piece.js";
import { RandomGenerator } from "./random_generator.js";

export class RandomPieceQueue {
  randomGenerator = new RandomGenerator([IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece])

  // noinspection JSMismatchedCollectionQueryUpdate
  #queue = [];

  constructor(length) {
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
    return new (this.randomGenerator.next())();
  }

  next() {
    return this[Symbol.iterator]().next().value;
  }
}


