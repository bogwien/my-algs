import Vector from '@/models/Vector';

export default class VectorStatic {
  static multByNumber(v, number) {
    return new Vector(v.x * number, v.y * number);
  }

  static sum(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static mult(v1, v2) {
    return new Vector(v1.x * v2.x, v1.y * v2.y);
  }

  static distance(v1, v2) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  static between(v1, v2) {
    return this.sum(v1, v2).divByNumber(2);
  }

  static dot(v1, v2) {
    const mult = this.mult(v1, v2);

    return mult.x + mult.y;
  }
}
