import React, { useCallback, useEffect, useState } from "react";

const style = {
  show: {
    transitionProperty: "opacity",
    // fill: "#73AE8A",
    shapeRendering: "geometricPrecision",
  },
  fadeIn: {
    transitionDuration: "1s",
    opacity: 1,
  },
  fadeOut: {
    transitionDuration: "3s",
    opacity: 0,
  },
  hide: {
    fill: "transparent",
    opacity: 0,
  },
};

const Point = ({ data, size, visible, onDetect }: any) => {
  const [pointStyle, setPointStyle] = useState(style.hide);

  useEffect(() => {
    if (visible !== undefined && visible !== null) {
      const newStyle = visible
        ? { ...style.show, ...style.fadeIn }
        : { ...style.show, ...style.fadeOut };

      // setPointStyle(newStyle);

      if (visible) {
        onDetect(data);
      }
    }
  }, [visible, data]);

  return (
    <circle
      onClick={() => {
        console.log("click at ", data.id);
      }}
      cx={data.X}
      cy={data.Y}
      fill="red"
      opacity={1}
      r={"4"}
    >
      {visible ? (
        <>
          <animate
            attributeName="opacity"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="7;3;7;3"
            keyTimes="0;0.5;0.75;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </>
      ) : null}
    </circle>
  );
};

Point.defaultProps = {
  size: 5,
};

export default Point;
