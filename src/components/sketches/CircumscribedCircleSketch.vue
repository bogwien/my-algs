<template>
  <div class="d-flex justify-center">
    <vue-p5 v-on="{setup, draw, mouseclicked: mouseClicked}"></vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import Vector from '@/models/Vector';
import PointList from '@/models/PointList';
import CircleStatic from '@/models/static/CircleStatic';

export default {
  components: { VueP5 },
  data() {
    return {
      width: 600,
      height: 600,
      frameRate: 30,

      pointList: new PointList(),
      circles: [],
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
      this.drawCircles(sketch);

      sketch.scale(1, -1);
    },
    mouseClicked(sketch, e) {
      if (e.target?.id !== sketch.canvas?.id) {
        return;
      }

      this.pointList.push(new Vector(e.offsetX, e.offsetY));

      if (this.pointList.length > 2) {
        this.circles = this.searchCircles(this.pointList.points);
      }
    },

    drawPoints(sketch) {
      this.pointList.points.forEach((point) => {
        sketch.fill(255, 255, 255);
        sketch.ellipse(point.x, point.y, 5);
      });
    },
    drawCircles(sketch) {
      if (this.circles.length) {
        sketch.stroke(0, 255, 255);
        sketch.strokeWeight(1);
        sketch.noFill();

        this.circles.forEach((circle) => {
          sketch.circle(circle.center.x, circle.center.y, circle.radius * 2);
        });
      }
    },

    searchCircles(points) {
      const circles = [];

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          for (let k = j + 1; k < points.length; k++) {
            const circle = CircleStatic.circumscribe(
              points[i],
              points[j],
              points[k],
            );

            const otherPoints = points.filter((_, l) => ![i, j, k].includes(l));

            if (!circle.containsSome(otherPoints)) {
              circles.push(circle);
            }
          }
        }
      }

      return circles;
    },
  },
};
</script>

<style lang="scss" scoped></style>
