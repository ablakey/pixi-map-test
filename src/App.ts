import { Viewport } from "pixi-viewport";
import { Application, Graphics, Sprite, Texture } from "pixi.js";

import { Layer } from "./Layer";

export class App {
  private app: Application;
  private viewport: Viewport;
  private graphics: Graphics;
  private layers: Layer[] = [];

  private background: Sprite;

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
      this.layers.forEach((l) => l.render(this.viewport.scale.x));
    });

    this.graphics = new Graphics();
    this.viewport.addChild(this.graphics);
  }

  setScale(scale: number) {
    this.viewport.scale = { x: scale, y: scale };
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.viewport.addChild(layer.container);
    layer.render(this.viewport.scale.x);
  }

  addBackground(src: string, width: number, height: number, scale: number) {
    this.background = Sprite.from(src);
    this.viewport.addChild(this.background);
  }
}
