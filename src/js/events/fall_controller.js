export class FallController {
  #levelController;

  #fallTimer = 0;

  constructor(levelController) {
    this.#levelController = levelController;
  }

  getMsPerCell() {
    return (100 / this.#levelController.level) * 5
  }

  getInput(delta) {
    const msPerCell = this.getMsPerCell();
    let fall = false;
    this.#fallTimer += delta;
    if (this.#fallTimer >= msPerCell) {
      this.#fallTimer -= msPerCell;
      fall = true;
    }

    return { fall };
  }
}
