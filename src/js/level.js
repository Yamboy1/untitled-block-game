export class LevelController {
  #linesPerLevel = 10

  lines = 0;
  level = 1;

  addLines(numberOfLines) {
    this.lines += numberOfLines;
    if (this.lines >= this.level * this.#linesPerLevel) {
      this.level += 1;
    }
  }
}
