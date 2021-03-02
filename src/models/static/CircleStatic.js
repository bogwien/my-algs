import Vector from '@/models/Vector';
import Circle from '@/models/Circle';
import VectorStatic from '@/models/static/VectorStatic';

export default class CircleStatic {
  static circumscribe(v1, v2, v3) {
    const sBA = VectorStatic.sub(v2, v1);
    const sCA = VectorStatic.sub(v3, v1);

    const E = VectorStatic.dot(sBA, VectorStatic.sum(v2, v1));
    const F = VectorStatic.dot(sCA, VectorStatic.sum(v3, v1));

    const sCB = VectorStatic.sub(v3, v2);
    const G = 2 * (sBA.x * sCB.y - sBA.y * sCB.x);

    if (Math.abs(G) >= 0.000001) {
      const x = (sCA.y * E - sBA.y * F) / G;
      const y = (sBA.x * F - sCA.x * E) / G;
      const center = new Vector(x, y);

      const r = VectorStatic.multByNumber(v1, -1).add(center).mag();

      return new Circle(center, r);
    }

    const minx = Math.min(v1.x, v2.x, v3.x);
    const miny = Math.min(v1.y, v2.y, v3.y);
    const dx = (Math.max(v1.x, v2.x, v3.x) - minx) / 2;
    const dy = (Math.max(v1.y, v2.y, v3.y) - miny) / 2;

    const r = Math.sqrt(dx ** 2 + dy ** 2);
    const x = minx + dx;
    const y = miny + dy;

    return new Circle(new Vector(x, y), r);
  }
}
