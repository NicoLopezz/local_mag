import { FC } from "react";
import styled from "styled-components";



export const Qr_Icon: FC = () => {
  return (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path>
    </Svg>
  );
};

const Svg = styled.svg`
  color: #000000;
  margin-bottom: -5px;
  height: 30px;
  width: 20px;
  margin-bottom: 1px;
`;
