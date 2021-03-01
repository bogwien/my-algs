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
      rectangle: null,
      circle: null,
      triangle: null,
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
      this.drawRectangle(sketch);
      this.drawCircle(sketch);
      this.drawTriangle(sketch);

      sketch.scale(1, -1);
    },
    mouseClicked(sketch, e) {
      this.pointList.push(new Vector(e.offsetX, e.offsetY));

      if (this.pointList.length > 2) {
        this.rectangle = this.pointList.fitIntoRectangle();
        this.circle = this.rectangle.fitIntoCircle();
        this.triangle = this.circle.fitIntoTriangle();
      }
    },

    drawPoints(sketch) {
      this.pointList.points.forEach((point) => {
        sketch.fill(255, 255, 255);
        sketch.ellipse(point.x, point.y, 5);
      });
    },
    drawRectangle(sketch) {
      if (this.rectangle) {
        sketch.stroke(0, 0, 255);
        sketch.strokeWeight(1);
        sketch.noFill();
        sketch.beginShape();
        this.rectangle.points.forEach(({ x, y }) => {
          sketch.vertex(x, y);
        });
        sketch.vertex(this.rectangle.points[0].x, this.rectangle.points[0].y);
        sketch.endShape();
      }
    },
    drawCircle(sketch) {
      if (this.circle) {
        sketch.stroke(0, 255, 255);
        sketch.strokeWeight(1);
        sketch.noFill();
        sketch.circle(this.circle.center.x, this.circle.center.y, this.circle.radius * 2);
      }
    },
    drawTriangle(sketch) {
      if (this.triangle) {
        sketch.stroke(255, 0, 0);
        sketch.strokeWeight(1);
        sketch.noFill();
        sketch.beginShape();
        this.triangle.points.forEach((point) => {
          sketch.vertex(point.x, point.y);
        });
        sketch.vertex(this.triangle.points[0].x, this.triangle.points[0].y);
        sketch.endShape();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
