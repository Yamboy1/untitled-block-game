export class ScoreController {
  #scoresPerLine = new Map([
    [0, 0],
    [1, 40],
    [2, 100],
    [3, 300],
    [4, 1200]
  ]);

  /** @type {LevelController} */
  #levelController;

  score = 0;

  /** @param levelController {LevelController} */
  constructor(levelController) {
    this.#levelController = levelController;
  }

  addLines(linesCleared) {
    let score = this.#scoresPerLine.get(linesCleared);
    if (score === undefined) {
      throw new Error("Invalid number of lines for score");
    }
    this.score += Math.floor(score * (1.25 ** this.#levelController.level));
  }

  addPushDownPoints(pointsAdded) {
    this.score += pointsAdded;
  }
}

