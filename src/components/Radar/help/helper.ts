import { flow, map, filter } from "lodash/fp";
import assign from "lodash/assign";
import round from "lodash/round";
import random from "lodash/random";

import cloneDeep from "lodash/cloneDeep";

import CreatePoint from "./point";
import { deg2rad, rad2deg } from "./geo";

const preparePoints = ({ pxRadius, geoRadius, center, points }: any) => {
  const c = CreatePoint(center);
  const scale = pxRadius / geoRadius;

  return flow(
    map(CreatePoint),
    map((point) => {
      const bearing = c.bearingTo(point);
      let distance;
      const bearingDeg = round(rad2deg(bearing), 3);

      switch (point.check.check) {
        case 1:
          distance = point.check.check * (geoRadius / 4) - random(0, 300);
          break;
        case 2:
          distance = point.check.check * (geoRadius / 4) - random(0, 500);
          break;
        case 3:
          distance = point.check.check * (geoRadius / 4) - random(0, 500);
          break;
        case 4:
          distance = point.check.check * (geoRadius / 4) - random(0, 500);
          break;
        default:
          return;
      }

      const newX = +pxRadius + distance * scale * Math.sin(bearing);
      const newY = +pxRadius - distance * scale * Math.cos(bearing);
      // Check for proximity and adjust if needed

      return assign(point, {
        distance: distance,
        bearing: bearingDeg > 0 ? bearingDeg : 360 + bearingDeg,
        X: newX,
        Y: newY,
      });
    }),
    filter((point) => point.distance < geoRadius)
  )(cloneDeep(points));

  // return adjustedPoints;
};

const prepareIndicator = (radius: any, angle: any) => {
  const template = "M %R %R L %R 0 A%R %R 0 0 0 %DX %DY L%DX %R Z";
  return template
    .replace(/%R/g, radius?.toString())
    .replace(/%DX/g, (radius - radius * Math.sin(deg2rad(angle))).toString())
    .replace(/%DY/g, (radius - radius * Math.cos(deg2rad(angle))).toString());
};

export { preparePoints, prepareIndicator };
