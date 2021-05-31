import { Tile } from "./vector.js";
import { MatrixTile } from "./matrix.js";

export class Board {
  /** @type {number} */
  WIDTH;

  /** @type {number} */
  HEIGHT;

  /** @type {MatrixTile[][]} **/
  data;

  constructor(width, height) {
    this.WIDTH = width;
    this.HEIGHT = height;

    this.data = [];
    for (let i = 0; i < height; i++) {
      this.data.push([]);
    }
  }

  /**
   * Returns all of the non undefined tiles
   * in the matrix.
   * @returns {Generator<*, Tile, *>}
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.WIDTH; i++) {
      for (let j = 0; j < this.HEIGHT; j++) {
        if (!this.has(i,j)) continue;
        yield new Tile(i,j,this.get(i,j).color);
      }
    }
  }

  /**
   * Get the value at (x,y) on the board
   * @param x {number}
   * @param y {number}
   * @returns {MatrixTile}
   */
  get(x,y) {
    if (x >= this.WIDTH || y >= this.HEIGHT) {
      throw new Error(`index (${x}, ${y}) is out of range for a board of size (${this.WIDTH}, ${this.HEIGHT})`);
    }
    return this.data[y][x];
  }

  /**
   * Check if there is a value at (x,y) on the board
   * @param x {number}
   * @param y {number}
   * @returns {boolean}
   */
  has(x,y) {
    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) return false;
    return this.get(x,y) !== undefined;
  }

  checkOutOfBounds(x,y) {
    return x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT
  }

  /**
   * Set the tile at (x,y) to be tile
   * @param x {number}
   * @param y {number}
   * @param tile {MatrixTile}
   */
  set(x,y, tile) {
    this.data[y][x] = tile;
  }

  /**
   *
   * @param piece {Piece}
   * @param clockwise {boolean}
   */
  rotatePiece(piece, clockwise) {
    piece.rotate(true);
    for (const tile of piece.tiles) {
      if (this.has(tile.x, tile.y) || this.checkOutOfBounds(tile.x, tile.y)) {
        piece.rotate(false)
      }
    }
  }

  /**
   * Return true if the bottom of the piece is colliding with anything
   * @param piece {Piece}
   */
  checkBottomCollision(piece) {
    for (const { x, y } of piece.tiles) {
      if (y === 0) return true;

      if (this.has(x, y-1)) {
        return true
      }
    }
    return false
  }

  /**
   * Returns a set of "Left" or "Right" if the piece
   * is colliding with the left and right sides respectively
   * @param piece {Piece}
   * @returns {Set<"Left" | "Right">}
   */
  checkSideCollisions(piece) {
    const collisions = new Set();
    for (const { x, y } of piece.tiles) {
      if (x === 0) collisions.add("Left");
      if (x === this.WIDTH - 1) collisions.add("Right");

      if (!collisions.has("Left") && this.has(x - 1, y)) collisions.add("Left");
      if (!collisions.has("Right") && this.has(x + 1, y)) collisions.add("Right");
    }
    return collisions;
  }

  /**
   * Check if any of the tiles in the array
   * overlap any tiles on the board
   * @param tiles {Tile[]}
   */
  overlappingTiles(tiles) {
    for (const tile of tiles) {
      if (this.get(tile.x, tile.y)) {
        return true;
      }
    }
    return false;
  }

  clearFullRows() {
    let count = 0;
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      if (row.filter(tile => tile !== undefined).length === this.WIDTH) {
        this.data.splice(i, 1);
        this.data.push([]);
        count += 1;
      }
    }
    return count;
  }

  lockDownPiece(piece) {
    for (const tile of piece.tiles) {
      this.set(tile.x, tile.y, new MatrixTile(tile.color));
    }
  }
}
