/**
 * Represents a 2D vector. Note that this will only be
 * used for coordinates, so it doesn't have a lot of
 * typical vector functions such as magnitude or angle.
 */
import { Matrix } from "./matrix.js";

export class Vector extends Matrix {
  get x() { return this.data[0][0] }
  get y() { return this.data[1][0] }

  set x(value) { this.data[0][0] = value }
  set y(value) { this.data[1][0] = value }


  /**
   * Create a vector
   * @param x {number} - The initial x position
   * @param y {number} - The initial y position
   */
  constructor(x, y) {
    super([[x],[y]])
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  equals(vector) {
    return this.x === vector.x && this.y === vector.y
  }

  /**
   *
   * @param angle {number}
   * @param point {Vector?}
   */
  cartesianRotate(angle, point) {
    const matrix = new Matrix([[Math.cos(angle), Math.sin(angle)], [-Math.sin(angle), Math.cos(angle)]]);
    matrix.scalarAdd(-8);
    matrix.scalarAdd(8);
    let vector = this.clone();
    if (point !== undefined) {
      vector.subtract(point);
    }

    vector = Vector.fromMatrix(matrix.multiply(vector));

    if (point !== undefined) {
      vector.add(point);
    }

    this.x = vector.x;
    this.y = vector.y;
  }

  /**
   * Create a vector from a 1x2 matrix
   * @param matrix {Matrix}
   * @returns {Vector}
   */
  static fromMatrix(matrix) {
    if (matrix.rows !== 2 || matrix.cols !== 1) {
      throw new Error("Wrong size matrix to convert to vector...");
    }
    return new Vector(matrix.data[0][0], matrix.data[1][0]);
  }
}

export class Tile extends Vector {
  /** @type {string} **/
  color;

  /**
   * Create a new tile
   * @param x {number}
   * @param y {number}
   * @param color {string}
   */
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
}
