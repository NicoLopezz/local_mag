import { FC } from "react";
import styled from "styled-components";

export const Servicios_Icon: FC = () => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </Svg>
  );
};

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.text};
`;
