import CircleStatic from '@/models/static/CircleStatic';
import Ant from '@/models/AntColonyOptimization/Ant';
import VectorStatic from '@/models/static/VectorStatic';

export default class Optimization {
  constructor(points, ants) {
    this.points = points;
    this.ants = ants;
    this.routes = points.map(() => []);
    this.bestRoute = { points: [], length: Infinity };
    this.started = false;
  }

  triangulate() {
    this.routes = this.routes.map(() => []);

    for (let i = 0; i < this.points.length - 2; i++) {
      for (let j = i + 1; j < this.points.length - 1; j++) {
        for (let k = j + 1; k < this.points.length; k++) {
          const circle = CircleStatic.circumscribe(
            this.points[i],
            this.points[j],
            this.points[k],
          );

          const otherPoints = this.points.filter((_, l) => ![i, j, k].includes(l));
          const isUnique = !circle.containsSome(otherPoints);

          if (isUnique) {
            const triangle = [i, j, k];

            triangle.forEach((p) => {
              triangle.forEach((n) => {
                if (p !== n && this.routes[p].every((r) => r.point !== n)) {
                  const length = VectorStatic.distance(this.points[p], this.points[n]);
                  this.routes[p].push({
                    point: n,
                    pheromones: 1000 / length,
                    length,
                  });
                }
              });
            });
          }
        }
      }
    }
  }

  start() {
    this.started = true;
  }

  tick() {
    if (!this.started) {
      return this.bestRoute;
    }

    this.routes = this.routes.map((route) => route.map((point) => {
      let { pheromones } = point;

      pheromones = pheromones < 10 ? 10 : pheromones - 0.01;

      return { ...point, pheromones };
    }));

    for (let i = 0; i < this.ants; i++) {
      const startPoint = Math.floor(Math.random() * this.points.length);

      const ant = new Ant(this.routes);

      const route = ant.walk(startPoint);

      if (route.length <= this.routes.length) {
        continue;
      }

      route.forEach((point, j, list) => {
        const r = this.routes[point];

        if (j + 1 < list.length) {
          const nIndex = route[j + 1];
          const neighbor = r.find((n) => n.point === nIndex);
          neighbor.pheromones += list.length / this.ants;
        }
      });

      const routeLength = route.reduce((len, r, c, array) => {
        if (c + 1 < array.length) {
          const nextPoint = array[c + 1];
          const next = this.routes[r].find((e) => e.point === nextPoint);
          return len + next.length;
        }

        return len;
      }, 0);

      if (this.bestRoute.length > routeLength) {
        this.bestRoute = { points: route, length: routeLength };
        console.log('New solution!', this.bestRoute.length);
      }
    }

    return this.bestRoute;
  }
}
