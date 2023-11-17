import { useEffect, useState } from "react";
import random from "lodash/random";
import Radar from "./Radar";

const R = 2500; // chọn bán kính thích hợp

const Center = { lat: 50.083702, lng: 14.434289, data: { name: "I'm here" } };
function initPositions(numPoints: any) {
  const points = [] as any;

  for (let i = 0; i < numPoints; i++) {
    const theta = Math.random() * 2 * Math.PI;
    points.push({
      id: `${i}`,
      lat: R * Math.cos(theta),
      lng: R * Math.sin(theta),
      data: { name: `Point ${i}` },
      check: random(1, 4),
    });
  }
  for (let point of points) {
    point.lat *= 0.1 + 10;
    point.lng *= 0.1 + 14;
  }

  return points;
}

// Hàm tính lực
function calculateForces(points: any) {
  const springK = 0.1; // Hệ số lực đàn hồi
  const repulsionK = 0.5; // Hệ số lực đẩy

  let fx = 0;
  let fy = 0;

  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const point2 = points[j];

        // Tính lực đàn hồi
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const springForce = springK * distance;
        fx += (springForce * dx) / distance;
        fy += (springForce * dy) / distance;

        // Tính lực đẩy

        const minDistance = 0.015;

        if (distance < minDistance) {
          const repulsionForce = -repulsionK / (distance * distance);
          // Tính lực đẩy mạnh hơn để đẩy điểm ra xa
          fx += (20 * (repulsionForce * dx)) / distance;
          fy += (20 * (repulsionForce * dy)) / distance;
        }
      }
    }
  }

  return { fx, fy };
}

// Hàm cập nhật vị trí điểm
function updatePositions(points: any, forces: any) {
  for (let i = 0; i < points.length; i++) {
    points[i].x += forces.fx;
    points[i].y += forces.fy;
  }
}

// Thuật toán chính
function forceDirectedGraph(numPoints: any) {
  let points = initPositions(numPoints);

  for (let i = 0; i < 2000; i++) {
    const forces = calculateForces(points);
    updatePositions(points, forces);
  }

  return points;
}

// Sử dụng
const Points = forceDirectedGraph(50);

// console.log(Pointss);
// const Points = generatePoints();

const Index = () => {
  const [pxRadius, setPxRadius] = useState(220);
  const [geoRadius] = useState(2000);
  const [center, setCenter] = useState(Center);
  const [points, setPoints] = useState(Points);

  const handleDetect = (point: any, radar: any) => {
    // console.log(
    //   `Detected '${point.data.name}'. Distance(m): ${radar.distance}. Bearing(deg): ${radar.bearing}`
    // );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints: any) =>
        prevPoints.map((point: any) => ({
          ...point,
          lat: point.lat + (Math.random() - 0.5) * 0.001,
          lng: point.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-2 bg-transparent rounded-xl  w-full h-full relative overflow-x-hidden overflow-y-hidden`}
    >
      <div className="p-10 h-full w-full bg-green-600/10 rounded-xl">
        <div className=" bg-opacity-10">
          <div className=" rounded-2xl  h-96    flex items-center justify-center">
            {/* <div className=" animate-circle relative p-5 bg-black/25  border-2 border-dashed rounded-full border-spacing-2 border-gray-400/50"> */}
            {/* {imageButtons} */}
            <div className="w-fit bg-transparent brightness-110  flex items-center justify-center p-2 rounded-full  object-cover transition-all duration-500">
              <div className="pointer-events-none animate-bounce-sm block    ">
                <Radar
                  pxRadius={pxRadius}
                  geoRadius={geoRadius}
                  center={center}
                  points={points}
                  onDetect={handleDetect}
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
