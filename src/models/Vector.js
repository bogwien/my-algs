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

  static sum(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static distance(v1, v2) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  static between(v1, v2) {
    return this.sum(v1, v2).divByNumber(2);
  }
}
