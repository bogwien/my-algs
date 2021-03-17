import Ant from '@/models/AntColonyOptimization/Ant';
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
    this.minPheromones = 10;
    this.maxPheromones = 100;
    this.pheromonesVaporization = 0.0001;
  }

  init() {
    this.routes = [];

    for (let i = 0; i < this.points.length; i++) {
      this.routes[i] = [];

      for (let j = i + 1; j < this.points.length; j++) {
        const length = VectorStatic.distance(this.points[i], this.points[j]);

        this.routes[i][j] = {
          length,
          pheromones: this.maxPheromones,
          probability: this.calcProbability(length, this.maxPheromones),
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
    return pheromones ** this.alfa + (1 / length) ** this.beta;
  }

  tick() {
    if (!this.started) {
      return this.bestRoute;
    }

    let bestRoute = null;
    const routes = [];

    for (let i = 0; i < this.ants; i++) {
      const startPoint = Math.round(Math.random() * (this.points.length - 1));

      const ant = new Ant(this.routes);

      const route = ant.walk(startPoint);

      const routeLength = this.calcRouteLenght(route);

      if (!bestRoute || bestRoute.length < routeLength) {
        bestRoute = { points: route, length: routeLength };
      }

      routes.push({ points: route, length: routeLength });
    }

    this.applyVaporization();

    this.applyRoutePheromones(routes);

    if (this.bestRoute.length > bestRoute.length) {
      this.bestRoute = bestRoute;
      console.log('New solution!', this.bestRoute.length);
    }

    const ph = this.routes.flat().map((a) => a.pheromones);
    console.log(Math.min(...ph), Math.max(...ph));

    return this.bestRoute;
  }

  calcRouteLenght(route) {
    return route.reduce((len, point, j, list) => {
      if (j + 1 >= list.length) {
        return len;
      }

      const nextPoint = list[j + 1];

      const point1 = Math.min(point, nextPoint);
      const point2 = Math.max(point, nextPoint);

      return this.routes[point1][point2].length + len;
    }, 0);
  }

  applyVaporization() {
    this.routes = this.routes.map((r) => r.map((point) => {
      let { pheromones, probability } = point;
      const { length } = point;

      pheromones *= (1 - this.pheromonesVaporization);
      pheromones = pheromones < this.minPheromones ? this.minPheromones : pheromones;

      probability = this.calcProbability(length, pheromones);

      return { ...point, pheromones, probability };
    }));
  }

  applyRoutePheromones(routes) {
    routes.forEach(({ points, len }) => {
      points.forEach((point, j, list) => {
        if (j + 1 >= list.length) {
          return;
        }

        const nextPoint = list[j + 1];

        const point1 = Math.min(point, nextPoint);
        const point2 = Math.max(point, nextPoint);

        let k = 1;
        if (this.bestRoute.length < Infinity && len > 0.001) {
          k = this.bestRoute.length / len;
        }

        this.routes[point1][point2].pheromones += k / this.routes[point1][point2].length;

        const { length, pheromones } = this.routes[point1][point2];
        this.routes[point1][point2].probability = this.calcProbability(length, pheromones);
      });
    });
  }
}
