import { Tile, Vector } from "./vector.js";

/**
 * Represents a piece. This is the
 * base class, there will be other subclasses
 * for each specific piece.
 */
export class Piece {
  /**
   * The tiles on the board representing the piece
   * @type {Tile[]}
   */
  tiles;

  /** @type {Vector} */
  #rotationCenter;

  /**
   * Create a piece
   * @param vectors {Vector[]}
   * @param color {string}
   * @param rotationCenter {Vector}
   */
  constructor(vectors, color, rotationCenter) {
    this.tiles = vectors.map(({ x, y }) => new Tile(x, y, color));
    this.#rotationCenter = rotationCenter;
  }

  /**
   * Moves the piece by the displacement given by vector
   * @param vector {Vector}
   */
  move(vector) {
    for (const tile of this.tiles) {
      tile.add(vector);
    }
    this.#rotationCenter.add(vector);
  }

  rotate(clockwise) {
    for (const tile of this.tiles) {
      tile.cartesianRotate((clockwise ? Math.PI/2 : -Math.PI/2), this.#rotationCenter);
    }
  }

}

export class TPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(4,19),
      new Vector(3,18),
      new Vector(4,18),
      new Vector(5,18)
    ]
    super(tiles, color ?? "purple", new Vector(4,18))
  }
}

export class OPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(4,19),
      new Vector(5,19),
      new Vector(4,18),
      new Vector(5,18)
    ]
    super(tiles, color ?? "yellow", new Vector(4.5, 18.5))
  }
}

export class SPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(5,19),
      new Vector(4,19),
      new Vector(4,18),
      new Vector(3,18)
    ]
    super(tiles, color ?? "green", new Vector(4,18))
  }
}

export class ZPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(3,19),
      new Vector(4,19),
      new Vector(4,18),
      new Vector(5,18)
    ]
    super(tiles, color ?? "red", new Vector(4,18))
  }
}

export class LPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(5,19),
      new Vector(5,18),
      new Vector(4,18),
      new Vector(3,18)
    ]
    super(tiles, color ?? "orange", new Vector(4,18))
  }
}
export class JPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(3,19),
      new Vector(5,18),
      new Vector(4,18),
      new Vector(3,18)
    ]
    super(tiles, color ?? "blue", new Vector(4,18))
  }
}

export class IPiece extends Piece {
  constructor(color) {
    const tiles = [
      new Vector(3,19),
      new Vector(4,19),
      new Vector(5,19),
      new Vector(6,19)
    ]
    super(tiles, color ?? "lightblue", new Vector(4.5, 19.5))
  }
}
