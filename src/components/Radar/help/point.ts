import assign from "lodash/assign";

import Geo, { deg2rad } from "./geo";
import uuid from "./uuid";

const Point = assign({}, Geo, {
  getData: function getData(): any {
    return {
      point: this.orig,
      radar: {
        distance: this.distance,
        bearing: this.bearing,
      },
    };
  },
});

const CreatePoint = function (p: any) {
  return assign(Object.create(Point), {
    id: uuid(),
    lat: p?.lat,
    lng: p?.lng,
    orig: p,
    check: p,
  });
};

export default CreatePoint;
