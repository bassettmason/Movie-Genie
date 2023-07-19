import React from "react";
// import Svg, { Path } from "react-native-svg";

const Magic = (props) => {
  const { width, height, color } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      version="2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        stroke={color}
        strokeWidth="2"
        d="M10.486 2.25l.01-.005.004-.009.005.01.009.004-.01.005-.004.009-.005-.01-.009-.004zM4.552 4.106l-.298.149-.149.298-.355.71-.355-.71-.15-.298-.297-.15-.712-.355.712-.356.298-.149.149-.298.355-.71.355.71.15.298.297.15.712.355-.712.356zm14.896 12.789l.298-.15.149-.298.355-.71.355.71.15.299.297.149.712.355-.712.356-.298.15-.149.297-.355.711-.355-.71-.15-.299-.297-.149-.712-.356.712-.355zm3.405-11.77h0a.499.499 0 010 .705h0L5.831 22.855a.495.495 0 01-.354.146.495.495 0 01-.353-.146l-3.977-3.978h0a.5.5 0 010-.707L18.169 1.147h0A.494.494 0 0118.524 1c.13 0 .255.049.352.146h0l3.978 3.978zM17.086 9.3l.707.708.707-.708 3.116-3.115.707-.707-.707-.707-2.387-2.387-.707-.707-.707.707L14.7 5.5l-.707.707.707.707L17.086 9.3z">
      </path>
    </svg>
  );
};

export default Magic;
