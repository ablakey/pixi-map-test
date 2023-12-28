import { times } from "lodash";
import { Container, Graphics, LINE_CAP, LINE_JOIN } from "pixi.js";
import { Feature, LineString, Point, Polygon } from "./types";

export class Layer {
  public container: Container<Graphics>;
  private features: Feature[];

  // true for an index if that feature has already been mounted. Used to handlde render vs. re-render.
  private isMounted: boolean[] = [];

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

      if (geom.type === "LineString") {
        // graphics.clear();
        // this.renderLineStyle(graphics, geom, scale);
      } else if (geom.type === "Polygon") {
        if (this.isMounted[idx]) {
          this.reRenderPolygonStyle(graphics, geom, scale);
        } else {
          graphics.clear();
          this.renderPolygonStyle(graphics, geom, scale);
          this.isMounted[idx] = true;
        }
      } else if (geom.type === "Point") {
        // graphics.clear();
        // this.renderPointStyle(graphics, geom, scale);
      }
    });
  }

  private renderPolygonStyle(graphics: Graphics, polygon: Polygon, scale: number) {
    const BORDER_THICKNESS = 1;
    const BORDER_COLOR = 0x009a00;
    const BORDER_ALPHA = 1;

    const FILL_COLOR = 0x009a00;
    const FILL_ALPHA = 0.6;

    const coords = polygon.coordinates[0];

    graphics.lineStyle(BORDER_THICKNESS / scale, BORDER_COLOR, BORDER_ALPHA);
    // First step is a move to, to begin the draw.
    graphics.moveTo(coords[0][0], coords[0][1]);

    graphics.beginFill(FILL_COLOR, FILL_ALPHA);

    for (let x = 1; x < coords.length; x++) {
      graphics.lineTo(coords[x][0], coords[x][1]);
    }

    graphics.endFill();
  }

  /**
   * Once already created, an attempt to more performantly update the graphics.
   */
  private reRenderPolygonStyle(graphics: Graphics, polygon: Polygon, scale: number) {
    const BORDER_THICKNESS = 2;
    const thickness = BORDER_THICKNESS / scale;

    for (let x = 0; x < graphics.geometry.graphicsData.length; x++) {
      graphics.geometry.graphicsData[x].lineStyle.width = thickness;
    }
    graphics.geometry.invalidate();
  }

  private renderPointStyle(graphics: Graphics, point: Point, scale: number) {
    const POINT_COLOR = 0x00cc00;
    const BORDER_THICKNESS = 0.1;
    const BORDER_COLOR = 0x000000;

    graphics.lineTextureStyle({ join: LINE_JOIN.ROUND, cap: LINE_CAP.ROUND });
    graphics.lineStyle(BORDER_THICKNESS, BORDER_COLOR);
    graphics.beginFill(POINT_COLOR, 1);
    graphics.drawRect(point.coordinates[0], point.coordinates[1], 0.5, 0.5);
    graphics.endFill();
  }

  private renderLineStyle(graphics: Graphics, line: LineString, scale: number) {
    const coords = line.coordinates;

    graphics.lineStyle(1 / scale, 0x00ff00);
    // First step is a move to, to begin the draw.
    graphics.moveTo(coords[0][0], coords[0][1]);

    for (let x = 1; x < coords.length; x++) {
      graphics.lineTo(coords[x][0], coords[x][1]);
    }
  }
}
