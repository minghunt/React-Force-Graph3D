import React, { useState, useEffect, useRef } from "react";
import map from "lodash/fp/map";

import PropTypes from "prop-types";
import img from "../../../public/assets/images/earth.png";
// import {
//   INITIAL_VALUE,
//   ReactSVGPanZoom,
//   TOOL_NONE,
//   fitSelection,
//   zoomOnViewerCenter,
//   fitToViewer,
// } from "react-svg-pan-zoom";
import Indicator from "./Indicator";
import { prepareIndicator, preparePoints } from "./help/helper";
import Grid from "./Grid";
import Point from "./Point";

const Radar = (props: any) => {
  const [state, setState] = useState({
    angle: 0,
    indicator: prepareIndicator(props.pxRadius, props.indicatorAngle),
    points: preparePoints(props),
  });

  const { pxRadius, setAngle } = props;
  const { angle, indicator, points } = state;
  const radius = +pxRadius;

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        angle: prevState.angle === 360 ? 0 : prevState.angle + 1,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const _onDetect = (p: any) => {
    const { point, radar } = p.getData();
    const { onDetect } = props;
    onDetect(point, radar);
  };

  //   const [zoom, setZoom] = useState(1);

  //   const Viewer = useRef(null);
  //   const [tool, setTool] = useState(TOOL_NONE);
  // const [value, setValue] = useState(INITIAL_VALUE);

  // useEffect(() => {
  //   Viewer.current.fitToViewer();
  // }, []);

  /* Read all the available methods in the documentation */
  // const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1);
  // const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200);
  // const _fitToViewer1 = () => Viewer.current.fitToViewer();

  /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
  // const _zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1));
  // const _fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200));
  // const _fitToViewer2 = () => setValue(fitToViewer(value));

  return (
    // <ReactSVGPanZoom
    //   ref={Viewer}
    //   width={600}
    //   height={500}
    //   tool={tool}
    //   onChangeTool={setTool}
    //   // value={value}
    //   // onChangeValue={setValue}
    //   onZoom={(e) => console.log("zoom")}
    //   onPan={(e) => console.log("pan")}
    //   // onClick={(event) =>
    //   //   console.log("click", event.x, event.y, event.originalEvent)
    //   // }
    // >
    <div className="radar-screen ">
      <svg
        width={radius * 2}
        height={radius * 2}
        className="flex justify-center items-center mx-auto "
        // style={{ backgroundColor: "#4ade80" }}
      >
        <image
          href={img} // Replace with the URL or path to your image
          x="0"
          y="0"
          style={{ objectFit: "cover" }}
          width={radius * 2}
          height={radius * 2}
          scale={1.5}
        />
        <line
          x1={radius}
          y1={0}
          x2={radius}
          y2={radius * 2}
          stroke="#4ade80"
          strokeWidth="1"
        />
        <line
          x1={0}
          y1={radius}
          x2={radius * 2}
          y2={radius}
          stroke="#4ade80"
          strokeWidth="1"
        />

        <Grid radius={radius} />

        <Indicator
          angle={angle}
          centerSize={radius / 40}
          d={indicator}
          radius={radius}
        />
        <g className="points">
          {map((point: any, index: any) => (
            <Point
              key={index}
              data={point}
              size={radius / 40}
              visible={
                point.bearing <= angle - 5 && point.bearing >= angle - 50
              }
              onDetect={_onDetect}
            />
          ))(points)}
        </g>
      </svg>
    </div>
    // </ReactSVGPanZoom>
  );
};

Radar.propTypes = {
  pxRadius: PropTypes.number,
  geoRadius: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  onDetect: PropTypes.func,
  indicatorAngle: PropTypes.number,
};

Radar.defaultProps = {
  pxRadius: 100,
  onDetect: () => {},
  indicatorAngle: 45,
};

export default Radar;
