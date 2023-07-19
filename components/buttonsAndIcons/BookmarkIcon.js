import React from "react";
import colors from "../../themes/colors";

function BookmarkIcon(props) {
  const { width, height, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 26"
    >
      <path
        fill={color}
        stroke={colors.mediumgrey}
        d="M.5 24.983V2.813c0-1.016.872-1.881 2-1.881h15c1.128 0 2 .865 2 1.881v22.17l-9.257-5.143-.243-.135-.243.135L.5 24.983z"
      ></path>
    </svg>
  );
}

export default BookmarkIcon;
