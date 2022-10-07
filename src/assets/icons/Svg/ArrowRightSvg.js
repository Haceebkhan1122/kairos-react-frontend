import React from "react";

function ArrowRightSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0L24 0 24 24 0 24z"></path>
        <rect
          width="2"
          height="14"
          x="11"
          y="5"
          fill="#7E8299"
          opacity="0.3"
          rx="1"
          transform="rotate(-90 12 12)"
        ></rect>
        <path
          fill="#00008b"
          fillRule="nonzero"
          d="M11.293 17.293a1 1 0 101.414 1.414l6-6a1 1 0 00.03-1.383l-5.5-6a1 1 0 00-1.474 1.352l4.853 5.294-5.323 5.323z"
        ></path>
      </g>
    </svg>
  );
}

export default ArrowRightSvg;
