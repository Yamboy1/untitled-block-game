export class CanvasController {
  /** @type {CanvasRenderingContext2D} */
  #ctx;

  /** @param ctx {CanvasRenderingContext2D} */
  constructor(ctx) {
    this.#ctx = ctx;
  }

  /**
   * Clears the canvas, i.e. set the entire canvas to white.
   */
  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  }

  /**
   * Draws a 20x20 pixel tile on the canvas
   * @param tile {Tile}
   */
  drawTile(tile) {
    this.#ctx.save();
    this.#ctx.fillStyle = tile.color;
    this.#ctx.fillRect(tile.x * 20, this.#ctx.canvas.height - (tile.y + 1) * 20, 20, 20);
    this.#ctx.restore()
  }
}
