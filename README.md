# pixi-map-test

## Test instructions

1. Extract a `<magical data>.map` file into `pixi-map-test/testdata`

2.

```
npm ci
npm run start
```

## Tidbits

### Re-rendering line width when zooming in and out.

Currently it's very expensive to re-create the entire graphics object every time. One approach is this: https://www.html5gamedevs.com/topic/9374-change-the-style-of-line-that-is-already-drawn/page/2/

But it might not help a lot. It still has to re-draw the graphics every time.

If we want less-smooth zooming, we can set pyramids up (ie. levels of detail so you cache each zoom-level).

A basic test seems to show it really doesn't help performance much. There's still 5ms per frame of just preparing what to send to the GPU.

### Custom Shader

See: https://stackoverflow.com/questions/72056609/pixi-js-how-to-draw-outline-of-container-while-keeping-its-content-transparent

And: https://github.com/pixijs/pixijs/discussions/7728


## Things I want


### Interaction

- Click on element
- drag box for select
- Drag element(s)
- Reshape polygon with handles
- Add handles to polygon


### Styles
- Highlight selected feature (tint filter?)
- arrow patterns on polygon
- text labels that don't scale
- text labels that do scale


### Layers
- Support lines with arrow end-caps.
- Support points from SVG

### Animation
- Lerp pan/zoom to a feature


### Optimization
- cull out-of-frame features
  - r-tree of bounding boxes?


### Architecture
- Determine sensible API for passing in immutable (eg. Immer) GeoJSON objects
- Sensible API for passing in list of selected features
- Sensible API for layer settings
  - Visible?
  - Labels?
