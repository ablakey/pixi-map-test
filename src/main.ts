import { App } from "./App";
import states from "../assets/states.json";
import { Layer } from "./Layer";

window.onload = () => {
  const app = new App();
  const layer = new Layer(states.features);
  app.addLayer(layer);
};
