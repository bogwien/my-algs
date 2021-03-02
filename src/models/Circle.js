import Triangle from '@/models/Triangle';
import Vector from '@/models/Vector';
import VectorStatic from '@/models/static/VectorStatic';

export default class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  fitIntoTriangle() {
    const k = 6 / Math.sqrt(3);
    const a = k * this.radius;
    const { x, y } = this.center;
    const r = this.radius;

    return new Triangle(
      new Vector(x, y + r * 2),
      new Vector(x + a / 2, y - r),
      new Vector(x - a / 2, y - r),
    );
  }

  contains(vector) {
    return VectorStatic.distance(this.center, vector) <= this.radius;
  }

  containsSome(vectors) {
    return vectors.some((point) => this.contains(point));
  }
}
