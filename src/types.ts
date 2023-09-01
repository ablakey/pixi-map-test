export type Position = [number, number];

export type Feature = {
  type: "Feature";
  geometry: Point | LineString | Polygon;
};

export type Point = {
  type: "Point";
  coordinates: Position;
};

export type LineString = {
  type: "LineString";
  coordinates: Position[];
};

export type Polygon = {
  type: "Polygon";
  coordinates: Position[][];
};
