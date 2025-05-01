import { FC } from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}

export const Card_Icon: FC<Props> = ({ onClick }) => {
  return (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 576 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"></path>
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
