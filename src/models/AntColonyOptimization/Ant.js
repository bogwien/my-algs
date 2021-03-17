export default class Ant {
  constructor(routes) {
    this.routes = routes;
  }

  walk(startPoint) {
    const points = this.routes.map((_, j) => j);

    const route = this.step(startPoint, points);

    if (this.routes[route[route.length - 1]].some((r) => r.point === startPoint)) {
      route.push(startPoint);
    }

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

    if (!endPoint) {
      return route;
    }

    return this.step(endPoint, points, route);
  }

  pickEndPoint(point, points) {
    const neighbors = this.routes[point].filter((n) => points.includes(n.point));
    if (!neighbors.length) {
      return null;
    }

    const total = neighbors.reduce((sum, n) => sum + n.pheromones, 0);
    let rand = Math.random() * total;

    for (let i = 0; i < neighbors.length; i++) {
      if (rand < neighbors[i].pheromones) {
        return neighbors[i].point;
      }

      rand -= neighbors[i].pheromones;
    }

    throw new Error('Cannot pick end point');
  }
}
