import React from "react";

function ArrowLeftSvg() {
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
          transform="matrix(0 -1 -1 0 24 24)"
        ></rect>
        <path
          fill="#00008b"
          fillRule="nonzero"
          d="M12.707 17.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 01-.03-1.383l5.5-6a1 1 0 111.474 1.352L7.384 11.97l5.323 5.323z"
        ></path>
      </g>
    </svg>
  );
}

export default ArrowLeftSvg;
