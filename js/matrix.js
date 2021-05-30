export class Matrix {
  /** @type {number[][]} */
  data;

  /** @type {number} */
  rows;

  /** @type {number} */
  cols;

  /** @param data {number[][]} */
  constructor(data) {
    this.rows = data.length;
    if (data.map(arr => arr.length).every(length => length === data[0].length)) {
      this.cols = data[0].length;
    } else {
      throw new Error("Matrix rows are not equal in length!!!");
    }
    this.data = data;
  }

  /**
   * Get an array of all the items in a specific row
   * @param index {number}
   * @returns {number[]}
   */
  getRow(index) {
    if (index >= this.rows) {
      throw new Error("Index greater than height of matrix")
    }

    return this.data[index];
  }

  getCol(index) {
    if (index >= this.cols) {
      throw new Error("Index greater than width of matrix");
    }

    const result = [];
    for (const row of this.data) {
      result.push(row[index]);
    }
    return result;
  }

  /**
   * Add another matrix to this matrix, modifying this matrix.
   * @param matrix {Matrix}
   */
  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error("The two matrices are not the same size!!!");
    }

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        this.data[i][j] += matrix.data[i][j]
      }
    }
    return this;
  }

  scalarAdd(scalar) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += scalar;
      }
    }
    return this;
  }

  /**
   * Add another matrix to this matrix, modifying this matrix.
   * @param matrix {Matrix}
   */
  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error("The two matrices are not the same size!!!");
    }

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        this.data[i][j] -= matrix.data[i][j]
      }
    }
    return this;
  }

  /**
   * Multiply this matrix by another matrix, returning the resulting matrix
   * @param matrix {Matrix}
   * @returns {Matrix}
   */
  multiply(matrix) {
    if (this.cols !== matrix.rows) {
      throw new Error("Matrices are incompatible for multiplication");
    }

    const arr = [];

    for (let i = 0; i < matrix.rows; i++) {
      const row = this.getRow(i);
      arr.push([]);
      for (let j = 0; j < matrix.cols; j++) {
        const col = matrix.getCol(j);
        arr[i][j] = row.reduce((prev, value, index) => prev + value * col[index], 0);
      }
    }
    return new Matrix(arr);
  }

  scalarMultiply(scalar) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= scalar;
      }
    }
    return this;
  }
}

export class MatrixTile {
  color;

  constructor(color) {
    this.color = color;
  }
}
