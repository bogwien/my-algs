<template>
  <div class="d-flex justify-center">
    <vue-p5 v-on="{setup, draw, mouseclicked: mouseClicked}"></vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import Vector from '@/models/Vector';
import PointList from '@/models/PointList';

export default {
  components: { VueP5 },
  data() {
    return {
      width: 600,
      height: 600,
      frameRate: 30,

      pointList: new PointList(),
    };
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(this.width, this.height);
      sketch.frameRate(this.frameRate);
    },
    draw(sketch) {
      sketch.background(0);

      sketch.noStroke();

      this.drawPoints(sketch);

      sketch.scale(1, -1);
    },
    mouseClicked(sketch, e) {
      if (e.target?.id !== sketch.canvas?.id) {
        return;
      }

      this.pointList.push(new Vector(e.offsetX, e.offsetY));
    },

    drawPoints(sketch) {
      this.pointList.points.forEach((point) => {
        sketch.fill(255, 255, 255);
        sketch.ellipse(point.x, point.y, 5);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
