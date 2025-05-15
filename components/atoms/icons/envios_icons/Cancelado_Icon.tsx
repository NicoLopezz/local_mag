import { FC } from "react";
import styled from "styled-components";

export const Cancelado_Icon: FC = () => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M18.364 5.636l-12.728 12.728"></path>
    </Svg>
  );
};

const Svg = styled.svg`
  color: #000000;
  background-color: white;
  border-radius: 50%;
`;
