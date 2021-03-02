export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  divByNumber(number) {
    this.x /= number;
    this.y /= number;

    return this;
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  magSq() {
    return this.x ** 2 + this.y ** 2;
  }
}
