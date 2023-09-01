import { App } from "./App";
import { Layer } from "./Layer";
import regions from "../testdata/regions.json";

// @ts-expect-error: Parcel handles this fine. `slam` is a string URL.
import slam from "../testdata/slam_map.png";

import slamData from "../testdata/slam_map.json";
import locusPoints from "../testdata/locus_points.json";

window.onload = () => {
  const app = new App();

  app.addBackground(slam, slamData.width, slamData.height, slamData.resolution);

  const regionlayer = new Layer(regions);
  app.addLayer(regionlayer);

  const lpLayer = new Layer(locusPoints);
  app.addLayer(lpLayer);

  app.centerOn(
    (slamData.width * slamData.resolution) / 2,
    (slamData.height * slamData.resolution) / 2,
  );

  let t = 0;
  function updateCamera() {
    t += 0.03;

    app.setScale(Math.max((Math.cos(t) + 1) * 10, 1));
    requestAnimationFrame(updateCamera);
  }

  // requestAnimationFrame(updateCamera);
};
