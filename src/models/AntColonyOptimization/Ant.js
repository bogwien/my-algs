export default class Ant {
  constructor(routes, alfa, beta) {
    this.routes = routes;
    this.alfa = alfa;
    this.beta = beta;
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

  calcProbability(route) {
    const pheromones = this.alfa === 1 ? route.pheromones : (route.pheromones ** this.alfa);
    const length = this.beta === 1 ? (1 / route.length) : (1 / (route.length ** this.beta));

    return pheromones * length;
  }

  pickEndPoint(point, points) {
    const probs = points.map((p) => {
      const point1 = Math.min(point, p);
      const point2 = Math.max(point, p);

      return this.calcProbability(this.routes[point1][point2]);
    });

    const total = points.reduce((sum, _, i) => sum + probs[i], 0);

    let rand = Math.random() * total;

    for (let i = 0; i < points.length; i++) {
      if (rand <= probs[i]) {
        return points[i];
      }

      rand -= probs[i];
    }

    throw new Error('Cannot pick end point');
  }
}
