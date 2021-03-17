<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="6">
        <v-text-field v-model="pointsNum" type="number" label="Points"></v-text-field>
        <v-text-field v-model="antsNum" type="number" label="Ants"></v-text-field>
      </v-col>
    </v-row>

    <div class="d-flex justify-end">
      <v-btn @click="start">Start</v-btn>
    </div>

    <div class="d-flex justify-center mt-5">
      <vue-p5 v-on="{setup, draw}"></vue-p5>
    </div>
  </v-container>
</template>

<script>
import VueP5 from 'vue-p5';
import AntColonyOptimizationWithTriangulation from '@/models/AntColonyOptimizationWithTriangulation/Optimization';
import VectorStatic from '@/models/static/VectorStatic';

export default {
  components: { VueP5 },
  data() {
    return {
      width: 600,
      height: 600,
      frameRate: 60,

      pointsNum: 10,
      antsNum: 10,
    };
  },
  computed: {
    points() {
      return Array.from(
        { length: this.pointsNum },
        () => VectorStatic.rand(this.width, this.height),
      );
    },
    model() {
      return new AntColonyOptimizationWithTriangulation(this.points, this.antsNum);
    },
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(this.width, this.height);
      sketch.frameRate(this.frameRate);
    },
    draw(sketch) {
      sketch.background(0);

      sketch.textSize(12);
      sketch.stroke(255);
      sketch.strokeWeight(1);
      sketch.text(Math.round(sketch.frameRate()), 3, 12);

      sketch.noStroke();

      this.drawPoints(sketch);
      this.drawEdges(sketch);

      const route = this.model.tick();

      this.drawRoute(sketch, route);

      sketch.scale(1, -1);
    },

    drawPoints(sketch) {
      sketch.fill(255, 255, 255);

      this.points.forEach((point) => {
        sketch.ellipse(point.x, point.y, 5);
      });
    },
    drawEdges(sketch) {
      sketch.stroke(255);
      sketch.strokeWeight(1);
      sketch.noFill();

      this.model.routes.forEach((neighbors, p) => {
        neighbors.forEach((n) => {
          sketch.beginShape();
          sketch.vertex(this.points[p].x, this.points[p].y);
          sketch.vertex(this.points[n.point].x, this.points[n.point].y);
          sketch.endShape();
        });
      });
    },
    drawRoute(sketch, route) {
      sketch.noFill();

      const maxPheromones = this.model.routes.reduce((m, r) => {
        const max = Math.max(...r.map((n) => n.pheromones));

        return Math.max(m, max);
      }, 0);

      route.points.forEach((p, i, array) => {
        if (i > 0) {
          const prevP = array[i - 1];
          const prev = this.model.routes[prevP];
          const current = prev.find((n) => n.point === p);
          const weight = current.pheromones / maxPheromones;

          sketch.stroke(255, Math.round(155 * weight) + 100, Math.round(100 * weight) + 155);
          sketch.strokeWeight(Math.round(7 * weight));
          sketch.line(
            this.points[p].x,
            this.points[p].y,
            this.points[prevP].x,
            this.points[prevP].y,
          );
        }
      });
    },

    start() {
      this.model.triangulate();
      this.model.start();
    },
  },
};
</script>

<style lang="scss" scoped></style>
