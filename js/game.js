import { Vector } from "./vector.js";
import { InputController } from "./events/input_controller.js";
import { RandomPieceQueue } from "./piece_queues/random_queue.js";
import { Board } from "./board.js";
import { TwoColorRandomPieceQueue } from "./piece_queues/two_color_random_queue.js";
import { ScoreController } from "./score.js";
import { LevelController } from "./level.js";
import { CanvasController } from "./canvas.js";
import { DomController } from "./dom.js";

export class Game {
  /** @const */
  #width = 10;

  /** @const */
  #height = 20;

  #elements;

  /** @type {boolean} */
  #running = false;

  /** @type{RandomPieceQueue | TwoColorRandomPieceQueue} */
  #queue;

  /** @type {Piece} */
  #piece;

  /** @type {Board} */
  #board = new Board(this.#width, this.#height);

  /** @type {DomController} */
  #domController;

  /** @type {CanvasController} */
  #canvasController;

  /** @type {LevelController} */
  #levelController = new LevelController();

  /** @type {InputController} */
  #inputController = new InputController(this.#levelController);

  /** @type {ScoreController} */
  #scoreController = new ScoreController(this.#levelController);

  constructor(ctx, { scoreElement, linesElement, levelElement}, colors) {
    if (colors.length > 0) {
      this.#queue = new TwoColorRandomPieceQueue(1, colors);
    } else {
      this.#queue = new RandomPieceQueue(1);
    }
    this.#piece = this.#queue.next()[0];
    this.#domController = new DomController({ scoreElement, linesElement, levelElement });
    this.#canvasController = new CanvasController(ctx);
  }

  run() {
    if (this.#running) {
      return;
    }

    let prevTimestamp = 0;
    this.#running = true;
    this.#inputController.start();

    /**
     * Main loop
     * @param timestamp {DOMHighResTimeStamp}
     */

    const mainLoop = timestamp => {
      let delta = timestamp - prevTimestamp;

      // If the delta is a large number, then the user may
      // have switched tabs or the computer is running slow
      // so we ignore it and move on, in order to not mess up the game
      if (delta > 100) {
        delta = 0;
      }

      const inputs = this.#inputController.getInputs(delta);
      this.#update(inputs)

      this.#draw();

      if (this.#running) {
        prevTimestamp = timestamp;
        requestAnimationFrame(mainLoop)
      }
    }

    this.#draw()
    mainLoop(0);
  }

  stop() {
    this.#running = false;
    this.#inputController.stop();
  }

  /**
   * The update part of the update loop
   * @param inputs {{left: boolean, right: boolean, down: boolean, fall: boolean, rotateClockwise, rotateAntiClockwise: boolean, hold: boolean}}
   */
  #update(inputs) {
    this.#handleInputs(inputs);

    const lines = this.#board.clearFullRows();
    this.#scoreController.addLines(lines);
    this.#levelController.addLines(lines);

    if (this.#board.overlappingTiles(this.#piece.tiles)) {
      this.stop();
    }
  }

  #handleInputs(inputs) {
    let moveDown = false;

    if (inputs.down) {
      moveDown = true;
      this.#scoreController.addPushDownPoints(1);
    } else if (inputs.fall) {
      moveDown = true;
    }

    if (moveDown) {
      if (this.#board.checkBottomCollision(this.#piece)) {
        this.#board.lockDownPiece(this.#piece)
        this.#piece = this.#queue.next()[0];
      }
      this.#piece.move(new Vector(0, -1));
    }

    if (inputs.rotateClockwise) {
      this.#board.rotatePiece(this.#piece, true);
    }

    let sideCollisions = this.#board.checkSideCollisions(this.#piece);

    if (inputs.left && !sideCollisions.has("Left")) {
      this.#piece.move(new Vector(-1, 0));
    }

    if (inputs.right && !sideCollisions.has("Right")) {
      this.#piece.move(new Vector(1, 0));
    }
  }

  #draw() {
    this.#canvasController.clearCanvas();

    for (const tile of [...this.#board, ...this.#piece.tiles]) {
      this.#canvasController.drawTile(tile);
    }

    this.#domController.displayLevel(this.#levelController.level);
    this.#domController.displayLines(this.#levelController.lines);
    this.#domController.displayScore(this.#scoreController.score);
  }
}

