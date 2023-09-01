import { App } from "./App";
import { Layer } from "./Layer";
import regions from "../testdata/regions.json";
import slam from "../testdata/slam_map.png";
import slamData from "../testdata/slam_map.json";

console.log(slam);

window.onload = () => {
  const app = new App();

  const regionlayer = new Layer(regions);
  app.addLayer(regionlayer);

  app.addBackground(slam, slamData.origin_x, slamData.origin_y, slamData.resolution);
};
