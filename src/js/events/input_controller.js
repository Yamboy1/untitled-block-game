import { KeyEventHandler } from "./event_handler.js";
import { LeftRightInputController } from "./left_right_input_controller.js";
import { FallController } from "./fall_controller.js";
import { DownController } from "./down_controller.js";
import { RotateClockwiseController } from "./rotate_clockwise_controller.js";


export class InputController {
  #eventHandler = new KeyEventHandler();

  #fallController;
  #leftRightInputController = new LeftRightInputController();
  #downController = new DownController();
  #rotateClockwiseController = new RotateClockwiseController();

  constructor(levelController) {
    this.#fallController = new FallController(levelController);
  }

  start() {
    this.#eventHandler.start();
  }

  stop() {
    this.#eventHandler.stop();
  }

  /**
   * Gets all the required inputs for the game at the current time.
   * This includes the piece falling.
   * @returns {{left: boolean, right: boolean, down: boolean, fall: boolean, rotateClockwise, rotateAntiClockwise: boolean, hold: boolean}}
   */
  getInputs(delta) {
    const { leftArrow, rightArrow, downArrow, upArrow } = this.#eventHandler.keys;

    return {
      ...this.#leftRightInputController.getInput(delta, { leftArrow, rightArrow }),
      ...this.#downController.getInput(delta, { downArrow }),
      ...this.#fallController.getInput(delta),
      ...this.#rotateClockwiseController.getInput(delta, { upArrow }),
      rotateAntiClockwise: false,
      hold: false
    }
  }
}
