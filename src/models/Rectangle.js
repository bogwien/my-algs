import Vector from '@/models/Vector';
import Circle from '@/models/Circle';

export default class Rectangle {
  constructor(A, B, C, D) {
    this.points = [A, B, C, D];
  }

  fitIntoCircle() {
    const center = Vector.between(this.points[0], this.points[2]);

    const radius = Vector.distance(center, this.points[0]);

    return new Circle(center, radius);
  }
}
