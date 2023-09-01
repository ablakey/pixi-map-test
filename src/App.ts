import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";

import { Layer } from "./Layer";

export class App {
  private app: Application;
  private viewport: Viewport;
  private graphics: Graphics;
  private layers: Layer[] = [];

  constructor() {
    const frameEl = document.querySelector<HTMLDivElement>("#frame")!;
    this.app = new Application({
      resizeTo: frameEl,
      resolution: devicePixelRatio,
    });

    frameEl.appendChild(this.app.view as HTMLCanvasElement);

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: this.app.renderer.events,
      worldHeight: 1000,
      worldWidth: 1000,
    });

    this.app.stage.addChild(this.viewport);

    this.viewport.drag().pinch().wheel().decelerate();

    this.viewport.on("zoomed", () => {
      this.layers.forEach((l) => l.render());
    });

    this.graphics = new Graphics();
    this.viewport.addChild(this.graphics);
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.viewport.addChild(layer.container);
    layer.render();
  }
}
