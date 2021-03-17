<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="pointsNum" type="number" label="Points"></v-text-field>
        <v-text-field v-model="antsNum" type="number" label="Ants"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="alfa" type="number" label="Alfa"></v-text-field>
        <v-text-field v-model="beta" type="number" label="Beta"></v-text-field>
      </v-col>
    </v-row>

    <div class="d-flex justify-space-around">
      <v-btn @click="reset" color="default">
        Reset
      </v-btn>

      <v-btn @click="model.init();inited = true;" color="primary">
        Init
      </v-btn>
      <v-btn :disabled="!inited || started" @click="model.start();started = true;" color="success">
        Start
      </v-btn>
      <v-btn :disabled="!started" @click="model.stop();started = false" color="error">
        Stop
      </v-btn>
    </div>

    <div class="d-flex justify-center mt-5">
      <vue-p5 v-on="{setup, draw}"></vue-p5>
    </div>
  </v-container>
</template>

<script>
import VueP5 from 'vue-p5';
import AntColonyOptimization from '@/models/AntColonyOptimization/Optimization';
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
      alfa: 1,
      beta: 1,

      inited: false,
      started: false,

      points: [],
    };
  },
  computed: {
    model() {
      return new AntColonyOptimization(
        this.points,
        this.antsNum,
        this.alfa,
        this.beta,
      );
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

      let route;
      try {
        route = this.model.tick();
      } catch (e) {
        sketch.noLoop();

        throw e;
      }

      this.drawRoute(sketch, route);
      sketch.noStroke();

      this.drawPoints(sketch);

      sketch.scale(1, -1);
    },

    drawPoints(sketch) {
      sketch.fill(255, 255, 255);

      this.points.forEach((point) => {
        sketch.ellipse(point.x, point.y, 5);
      });
    },
    drawRoute(sketch, route) {
      sketch.noFill();
      sketch.strokeWeight(3);

      route.points.forEach((p, i, array) => {
        if (i === 0) {
          return;
        }

        const point1 = Math.min(array[i - 1], p);
        const point2 = Math.max(array[i - 1], p);

        sketch.stroke(200);
        sketch.line(
          this.points[point1].x,
          this.points[point1].y,
          this.points[point2].x,
          this.points[point2].y,
        );
      });
    },

    createPoints(length) {
      return Array.from(
        { length },
        () => VectorStatic.rand(this.width, this.height),
      );
    },

    reset() {
      this.inited = false;
      this.started = false;
      this.points = this.createPoints(this.pointsNum);
    },
  },

  mounted() {
    this.points = this.createPoints(this.pointsNum);
  },

  watch: {
    pointsNum(value) {
      this.points = this.createPoints(value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
