import * as React from "react"

const ProjectManagementSvg = (props) => {
return(
<>
  <svg xmlns="http://www.w3.org/2000/svg" width={130} height={130}
    viewBox="0 0 25 25"
    fill=""
  {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect
        fill="#95E8E4"
        opacity={0.99}
        x={17}
        y={4}
        width={3}
        height={13}
        rx={1.5}
      />
      <rect
        fill="#95E8E4"
        opacity={0.99}
        x={12}
        y={9}
        width={3}
        height={8}
        rx={1.5}
      />
      <path
        d="M5 19h15a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v15Z"
        fill="#1BC5BD"
        fillRule="nonzero"
      />
      <rect
        fill="#95E8E4"
        opacity={0.99}
        x={7}
        y={11}
        width={3}
        height={6}
        rx={1.5}
      />
    </g>
  </svg>
</>
);
}

export default ProjectManagementSvg
