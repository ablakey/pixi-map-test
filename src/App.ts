import { Viewport } from "pixi-viewport";
import { Application, Graphics, SCALE_MODES, Sprite } from "pixi.js";

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
      antialias: true,
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
      this.rerender();
    });

    this.graphics = new Graphics();
    this.viewport.addChild(this.graphics);
  }

  rerender() {
    this.layers.forEach((l) => l.render(this.viewport.scale.x));
  }

  setScale(scale: number) {
    this.viewport.setZoom(scale, true);

    // this.rerender();
  }

  centerOn(x: number, y: number) {
    this.viewport.moveCenter(x, y);
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.viewport.addChild(layer.container);
    layer.render(this.viewport.scale.x);
  }

  addBackground(src: string, width: number, height: number, scale: number) {
    this.background = Sprite.from(src);
    this.background.y = height * scale;
    this.background.scale = { x: scale, y: -scale };
    this.background.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    this.viewport.addChild(this.background);
  }
}
