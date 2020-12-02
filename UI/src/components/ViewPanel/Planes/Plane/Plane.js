import React, { useContext, useEffect, useState, useRef } from "react";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Plane.css";

const getAngleDeg = (x1, y1, x2, y2) => {
  const angleRad = Math.atan2(y1 - y2, x1 - x2);
  return (angleRad * 180) / Math.PI;
};

const getXYFromTranslate = (translate) => {
  if (!translate) return [0, 0];
  const nums = translate
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((n) => n.trim())
    .map((n) => +n.substr(0, n.length - 2));
  return nums;
};

const Plane = ({ stationId, direction, name }) => {
  const { change } = useContext(AirportContext);

  const StationRef = document.getElementById(stationId);
  const [translate, setTranslate] = useState("translate(0px, 0px)");
  const [rotateZ, setrotateZ] = useState("rotateZ(0)");
  const [tooltip, setTooltip] = useState(false);
  const planeRef = useRef();

  useEffect(() => {
    if (!planeRef || !StationRef) return;
    const [x1, y1] = getXYFromTranslate(planeRef.current.style.transform);
    const [x2, y2] = getXYFromTranslate(StationRef.style.transform);
    const angleDeg = getAngleDeg(x1, y1, x2, y2);
    setrotateZ(`rotateZ(${angleDeg - 135}deg)`);
  }, [StationRef]);

  useEffect(() => {
    setTranslate(StationRef?.style.transform);
  }, [change, StationRef]);

  return (
    <div
      className="plane"
      style={{ transform: translate }}
      ref={planeRef}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <img
        className={direction ? "plane-takeoff" : "plane-landing"}
        alt="plane"
        src="https://img.icons8.com/plasticine/100/000000/airport.png"
        style={{ transform: rotateZ }}
      />
      {tooltip && (
        <div className="tooltip">
          <span className="tooltip-text">{name}</span>
        </div>
      )}
    </div>
  );
};

export default Plane;
