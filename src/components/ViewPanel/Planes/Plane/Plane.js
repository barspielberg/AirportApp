import React, { useContext, useEffect, useState, useRef } from "react";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Plane.css";

const getAngleDeg = (x1, y1, x2, y2) => {
  const angleRad = Math.atan2(y1 - y2, x1 - x2);
  return (angleRad * 180) / Math.PI;
};

const getXYFromTranslate = (translate) => {
  const nums = translate
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((n) => n.trim())
    .map((n) => +n.substr(0, n.length - 2));
  return nums;
};

const Plane = ({ stationId }) => {
  const { change } = useContext(AirportContext);

  const StationRef = document.getElementById(stationId);
  const [translate, setTranslate] = useState("translate(0px, 0px)");
  const [rotateZ, setrotateZ] = useState("rotateZ(0)");
  const imgRef = useRef();

  useEffect(() => {
    if (!imgRef || !StationRef) return;

    imgRef.current.style.transition = "transform 0.5s";

    const [x1, y1] = getXYFromTranslate(imgRef.current.style.transform);
    const [x2, y2] = getXYFromTranslate(StationRef.style.transform);
    const angleDeg = getAngleDeg(x1, y1, x2, y2);
    setrotateZ(`rotateZ(${angleDeg - 135}deg)`);

    setTimeout(() => {
      setTranslate(StationRef?.style.transform);
    }, 500);

    setTimeout(() => {
      imgRef.current.style.transition = "none";
    }, 1050);
  }, [StationRef]);

  useEffect(() => {
    setTranslate(StationRef?.style.transform);
  }, [change]);

  return (
    <img
      ref={imgRef}
      alt="plane"
      src="https://img.icons8.com/plasticine/100/000000/airport.png"
      style={{ transform: translate + rotateZ }}
    />
  );
};

export default Plane;
