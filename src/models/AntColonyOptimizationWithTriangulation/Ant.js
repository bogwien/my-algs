export default class Ant {
  constructor(routes) {
    this.routes = routes;
  }

  walk(startPoint) {
    const points = this.routes.map((_, i) => i);

    const route = this.step(startPoint, points);

    route.push(startPoint);

    return route;
  }

  step(startPoint, points, route = []) {
    const pointIndex = points.findIndex((p) => startPoint === p);
    points.splice(pointIndex, 1);

    route.push(startPoint);

    if (!points.length) {
      return route;
    }

    const endPoint = this.pickEndPoint(startPoint, points);

    return this.step(endPoint, points, route);
  }

  pickEndPoint(point, points) {
    const total = points.reduce((sum, p) => {
      const point1 = Math.min(point, p);
      const point2 = Math.max(point, p);

      return sum + this.routes[point1][point2].probability;
    }, 0);

    let rand = Math.random() * total;

    for (let i = 0; i < points.length; i++) {
      const point1 = Math.min(point, points[i]);
      const point2 = Math.max(point, points[i]);

      if (rand < this.routes[point1][point2].probability) {
        return points[i];
      }

      rand -= this.routes[point1][point2].probability;
    }

    throw new Error('Cannot pick end point');
  }
}
