import { FC } from "react";
import styled from "styled-components";

export const Empleados_Icon: FC = () => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      
      viewBox="0 0 24 24"
      
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </Svg>
  );
};

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.text};
`;
