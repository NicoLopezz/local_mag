import { FC } from "react";
import styled from "styled-components";

export const Tareas_Icon: FC = () => {
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
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </Svg>
  );
};

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.text};
`;
