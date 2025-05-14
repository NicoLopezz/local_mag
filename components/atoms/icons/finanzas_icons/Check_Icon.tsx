import { FC } from "react";
import styled from "styled-components";

interface Props {
  // onClick: () => void;
}

export const Check_Icon: FC<Props> = () => {
  return (
    <Svg
      // onClick={onClick}
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
    </Svg>
  );
};

const Svg = styled.svg`
  color: #000000;
`;
