import { FC } from "react";
import styled from "styled-components";

export const Finanzas_Icon: FC = () => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      
      viewBox="0 0 24 24"
      
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </Svg>
  );
};

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.text};
`;
