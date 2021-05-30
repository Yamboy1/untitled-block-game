export class KeyEventHandler {
  started = false;

  mapping = new Map([
    ["ArrowLeft", "leftArrow"],
    ["ArrowRight", "rightArrow"],
    ["ArrowDown", "downArrow"],
    ["ArrowUp", "upArrow"],
  ]);

  keys = {
    rightArrow: false,
    leftArrow: false,
    downArrow: false,
    upArrow: false
  }

  keydown = event => {
    if (this.mapping.has(event.key)) {
      this.keys[this.mapping.get(event.key)] = true;
    }
  }

  keyup = event => {
    if (this.mapping.has(event.key)) {
      this.keys[this.mapping.get(event.key)] = false;
    }
  }

  /**
   * Start the key event listeners.
   */
  start() {
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    this.started = true;
  }

  stop() {
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
    this.started = false;
  }
}
