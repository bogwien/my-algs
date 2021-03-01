import Triangle from '@/models/Triangle';
import Vector from '@/models/Vector';

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
}
