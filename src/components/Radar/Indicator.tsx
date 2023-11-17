import React from "react";
import PropTypes from "prop-types";
const style = {
  indicator: {
    shapeRendering: "geometricPrecision",
  },
};

const green = "#16a34a";

const transform = (angle: any, cx: any, cy: any) =>
  "rotate(angle, cx, cy)"
    .replace(/angle/, angle)
    .replace(/cx/, cx)
    .replace(/cy/, cy);

const Indicator = (props: any) => (
  <g className="indicator">
    <defs>
      <linearGradient id="indicator" x1="0" x2="1" y1="1" y2="0">
        <stop id="stop1" offset="0%" stopColor="transparent" />
        <stop id="stop2" offset="30%" stopColor="transparent" />
        <stop id="stop3" offset="100%" stopColor={green} />
      </linearGradient>
    </defs>
    <path
      d={props.d}
      transform={transform(props.angle, props.radius, props.radius)}
      fill="url(#indicator)"
      strokeWidth={10}
      shapeRendering={"geometricPrecision"}
    />
    <circle
      cx={props.radius}
      cy={props.radius}
      r={props.centerSize}
      fill={green}
    />
  </g>
);

Indicator.propTypes = {
  angle: PropTypes.number.isRequired,
  centerSize: PropTypes.number,
  d: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
};

Indicator.defaultProps = {
  centerSize: 3,
};

export default Indicator;
