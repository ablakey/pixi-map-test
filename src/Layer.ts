import { Container, Graphics } from "pixi.js";

export class Layer {
  public container: Container<Graphics>;
  private features: any[];

  constructor(features: any[]) {
    this.container = new Container();
    this.features = features;

    features.forEach((f) => {
      this.container.addChild(new Graphics());
    });
  }

  render() {
    this.features.forEach((f, idx) => {
      if (f.geometry.type === "MultiPolygon") {
        return;
      }

      const ring =
        f.geometry.type === "MultiPolygon"
          ? f.geometry.coordinates[0][0]
          : f.geometry.coordinates[0];

      const g = this.container.getChildAt(idx);
      g.clear();
      g.lineStyle(1, 0xffd900, 1);

      // Render each ring.
      g.beginFill(0xff3300);
      g.moveTo(ring[0][0], ring[0][1]);

      for (let x = 1; x < ring.length; x++) {
        g.lineTo(ring[x][0], ring[x][1]);
      }
      g.closePath();
      g.endFill();
    });
  }
}
