import Ant from '@/models/AntColonyOptimizationWithTriangulation/Ant';
import VectorStatic from '@/models/static/VectorStatic';

export default class Optimization {
  constructor(points, ants, alfa = 1, beta = 1) {
    this.points = points;
    this.ants = ants;
    this.routes = [];
    this.bestRoute = { points: [], length: Infinity };
    this.started = false;
    this.alfa = alfa;
    this.beta = beta;
    this.defaultPheromones = 100;
    this.pheromonesStep = 0.1;
  }

  init() {
    this.routes = [];

    for (let i = 0; i < this.points.length; i++) {
      this.routes[i] = [];

      for (let j = i + 1; j < this.points.length; j++) {
        const length = VectorStatic.distance(this.points[i], this.points[j]);

        this.routes[i][j] = {
          length,
          pheromones: this.defaultPheromones,
          probability: this.calcProbability(length, this.defaultPheromones),
        };
      }
    }
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  calcProbability(length, pheromones) {
    return (1 / length) ** this.alfa + pheromones ** this.beta;
  }

  tick() {
    if (!this.started) {
      return this.bestRoute;
    }

    this.routes = this.routes.map((route) => route.map((point) => {
      let { pheromones } = point;
      const { length } = point;

      pheromones = pheromones < 10 ? 10 : pheromones - this.pheromonesStep * this.ants * 0.25;
      const probability = this.calcProbability(length, pheromones);

      return { ...point, pheromones, probability };
    }));

    for (let i = 0; i < this.ants; i++) {
      const startPoint = Math.round(Math.random() * (this.points.length - 1));

      const ant = new Ant(this.routes);

      const route = ant.walk(startPoint);

      route.forEach((point, j, list) => {
        if (j + 1 >= list.length) {
          return;
        }

        const nextPoint = list[j + 1];

        const point1 = Math.min(point, nextPoint);
        const point2 = Math.max(point, nextPoint);

        this.routes[point1][point2].pheromones += this.pheromonesStep;
      });

      const routeLength = route.reduce((len, point, j, list) => {
        if (j + 1 >= list.length) {
          return len;
        }

        const nextPoint = list[j + 1];

        const point1 = Math.min(point, nextPoint);
        const point2 = Math.max(point, nextPoint);

        return this.routes[point1][point2].length + len;
      }, 0);

      if (this.bestRoute.length > routeLength) {
        this.bestRoute = { points: route, length: routeLength };
        console.log('New solution!', this.bestRoute.length);
      }
    }

    return this.bestRoute;
  }
}
