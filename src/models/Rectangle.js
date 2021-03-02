import Circle from '@/models/Circle';
import VectorStatic from '@/models/static/VectorStatic';

export default class Rectangle {
  constructor(A, B, C, D) {
    this.points = [A, B, C, D];
  }

  fitIntoCircle() {
    const center = VectorStatic.between(this.points[0], this.points[2]);

    const radius = VectorStatic.distance(center, this.points[0]);

    return new Circle(center, radius);
  }
}
