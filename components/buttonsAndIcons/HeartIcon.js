import React from "react";
import colors from "../../themes/colors";

function HeartIcon(props) {
  const { width, height, color, strokecolor } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="14"
      fill={height}
      viewBox="0 0 16 14"
    >
      <path
        fill={color}
        stroke={strokecolor}
        d="M8.591 1.722h0l-.588.634-.366.396-.367-.396-.588-.634h0C5.345.273 3.222.075 1.816 1.33.156 2.815.064 5.5 1.555 7.115l5.772 6.243s0 0 0 0a.407.407 0 00.617 0s0 0 0 0l5.772-6.243h0c1.493-1.615 1.402-4.3-.259-5.785l-4.866.392zm0 0C9.931.274 12.052.076 13.457 1.33l-4.866.392z"
      ></path>
    </svg>
  );
}

export default HeartIcon;