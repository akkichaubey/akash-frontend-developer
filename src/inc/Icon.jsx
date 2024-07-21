import React from "react";
import icon from "./svg.svg";

const Icon = ({ name, size = 24, width, height, className }) => (
  <svg
    className={`icon ${className}`}
    width={width || size}
    height={height || size}
  >
    <use xlinkHref={`${icon}#${name}`} />
  </svg>
);

export default Icon;
