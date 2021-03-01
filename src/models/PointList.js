import Rectangle from '@/models/Rectangle';
import Vector from '@/models/Vector';

export default class PointList {
  constructor(points = []) {
    this.points = points;
  }

  push(point) {
    this.points.push(point);
  }

  get length() {
    return this.points.length;
  }

  fitIntoRectangle() {
    const xList = this.points.map((v) => v.x);
    const yList = this.points.map((v) => v.y);

    const xMin = Math.min(...xList);
    const xMax = Math.max(...xList);

    const yMin = Math.min(...yList);
    const yMax = Math.max(...yList);

    return new Rectangle(
      new Vector(xMax, yMin),
      new Vector(xMax, yMax),
      new Vector(xMin, yMax),
      new Vector(xMin, yMin),
    );
  }
}
