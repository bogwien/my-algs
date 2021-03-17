import Ant from '@/models/AntColonyOptimization/Ant';
import VectorStatic from '@/models/static/VectorStatic';
import CircleStatic from '@/models/static/CircleStatic';

export default class Optimization {
  constructor(points, ants, alfa = 1, beta = 1) {
    this.points = points;
    this.ants = ants;
    this.routes = [];
    this.bestRoute = { points: [], length: Infinity };
    this.started = false;
    this.alfa = alfa;
    this.beta = beta;
    this.minPheromones = 5;
    this.maxPheromones = 100;
    this.pheromonesVaporization = 1 - 0.01;
    this.colony = [];
  }

  triangulate() {
    const triangulation = [];

    for (let i = 0; i < this.points.length - 2; i++) {
      for (let j = i + 1; j < this.points.length - 1; j++) {
        for (let k = j + 1; k < this.points.length; k++) {
          const circle = CircleStatic.circumscribe(
            this.points[i],
            this.points[j],
            this.points[k],
          );

          const otherPoints = this.points.filter((_, l) => ![i, j, k].includes(l));

          if (!circle.containsSome(otherPoints)) {
            const triangle = [[i, j], [i, k], [j, k]];

            triangle.forEach((e) => {
              if (!triangulation.some((t) => t.includes(e[0]) && t.includes(e[1]))) {
                triangulation.push(e);
              }
            });
          }
        }
      }
    }

    return triangulation;
  }

  init() {
    this.routes = [];
    const triangulation = this.triangulate();

    for (let i = 0; i < this.points.length; i++) {
      this.routes[i] = [];

      for (let j = i + 1; j < this.points.length; j++) {
        const length = VectorStatic.distance(this.points[i], this.points[j]);

        const isInTriangulation = triangulation.some((e) => e.includes(i) && e.includes(j));

        this.routes[i][j] = {
          length,
          pheromones: this.maxPheromones * (isInTriangulation ? 10 : 1),
          isInTriangulation,
        };
      }
    }

    this.colony = this.createColony();
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  createColony() {
    const colony = [];

    for (let i = 0; i < this.ants; i++) {
      colony.push(new Ant(this.routes, this.alfa, this.beta));
    }

    return colony;
  }

  tick() {
    if (!this.started) {
      return this.bestRoute;
    }

    const routes = this.colony.map((ant) => {
      const startPoint = Math.round(Math.random() * (this.points.length - 1));

      const route = ant.walk(startPoint);

      const routeLength = this.calcRouteLenght(route);

      const r = { points: route, length: routeLength };

      return r;
    });

    this.applyVaporization();

    this.applyRoutePheromones(routes);

    const bestRoute = routes.reduce((b, r, i, a) => (r.length < a[b].length ? i : b), 0);
    if (this.bestRoute.length > routes[bestRoute].length) {
      this.bestRoute = routes[bestRoute];
      console.log('New solution!', this.bestRoute.length);
    }

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
      let { pheromones } = point;

      pheromones *= this.pheromonesVaporization;
      pheromones = pheromones < this.minPheromones ? this.minPheromones : pheromones;

      return { ...point, pheromones };
    }));
  }

  applyRoutePheromones(routes) {
    const antWeight = 1 / this.ants;
    const edges = this.points.length;

    routes.forEach(({ points, length }) => {
      const routeK = this.bestRoute.length < Infinity ? this.bestRoute.length / length : 1;
      const routeWeight = antWeight * (routeK ** 2);
      const avarageEdge = length / edges;

      points.forEach((point, j, list) => {
        if (j + 1 >= list.length) {
          return;
        }

        const nextPoint = list[j + 1];

        const point1 = Math.min(point, nextPoint);
        const point2 = Math.max(point, nextPoint);

        const edgeWeight = Math.sqrt(avarageEdge / (this.routes[point1][point2].length));
        const triangulationWeight = this.routes[point1][point2].isInTriangulation ? 1 : 0.1;

        this.routes[point1][point2].pheromones += routeWeight * edgeWeight * triangulationWeight;
      });
    });
  }
}
