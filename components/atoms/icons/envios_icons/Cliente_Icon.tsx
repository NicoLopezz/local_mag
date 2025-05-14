import { FC } from "react";
import styled from "styled-components";

export const Cliente_Icon: FC = () => {
  return (
    <IconWrapper>
      <Svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="24px"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z" />
      </Svg>
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  transition: all 0.3s ease;
`;

const Svg = styled.svg`
  color: #000000;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
`;
