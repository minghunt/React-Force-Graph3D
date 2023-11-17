import React from "react";
import map from "lodash/fp/map";
import PropTypes from "prop-types";

interface GridProps {
  radius: number;
}

const style = {
  stroke: "#43A94E",
  fill: "transparent",
  strokeWidth: ".9",
  shapeRendering: "geometricPrecision",
};

const Grid: React.FC<GridProps> = ({ radius }) => (
  <g className="grid">
    {map((r: any) => (
      <circle cx={radius} cy={radius} r={radius * r} key={r} style={style} />
    ))([1 / 4, 1 / 2, (1 / 4) * 3, 1])}
  </g>
);

Grid.propTypes = {
  radius: PropTypes.number.isRequired,
};

export default Grid;
