import { times } from "lodash";
import { Container, Graphics } from "pixi.js";
import { Feature, LineString, Polygon } from "./types";

export class Layer {
  public container: Container<Graphics>;
  private features: Feature[];

  constructor(features: any[]) {
    this.container = new Container();
    this.features = features;

    times(features.length).forEach(() => {
      this.container.addChild(new Graphics());
    });
  }

  render(scale: number) {
    this.features.forEach((feature, idx) => {
      const geom = feature.geometry;
      // Get the graphics object and clear it.
      const graphics = this.container.getChildAt(idx);
      graphics.clear();

      if (geom.type === "LineString") {
        this.renderLineStyle(graphics, geom, scale);
      } else if (geom.type === "Polygon") {
        this.renderPolygonStyle(graphics, geom, scale);
      }
    });
  }

  renderPolygonStyle(graphics: Graphics, polygon: Polygon, scale: number) {
    const BORDER_THICKNESS = 1;

    const coords = polygon.coordinates[0];

    graphics.lineStyle(BORDER_THICKNESS / scale, 0x00ff00);
    // First step is a move to, to begin the draw.
    graphics.moveTo(coords[0][0], coords[0][1]);

    for (let x = 1; x < coords.length; x++) {
      graphics.lineTo(coords[x][0], coords[x][1]);
    }

    graphics.endFill();
  }

  renderLineStyle(graphics: Graphics, line: LineString, scale: number) {
    const coords = line.coordinates;

    graphics.lineStyle(1 / scale, 0x00ff00);
    // First step is a move to, to begin the draw.
    graphics.moveTo(coords[0][0], coords[0][1]);

    for (let x = 1; x < coords.length; x++) {
      graphics.lineTo(coords[x][0], coords[x][1]);
    }
  }
}
