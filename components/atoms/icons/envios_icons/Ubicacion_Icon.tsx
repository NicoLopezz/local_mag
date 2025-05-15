import { FC } from "react";
import styled from "styled-components";

export const Ubicacion_Icon: FC = () => {
  return (
    <IconWrapper>
      <Svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
        <circle cx="12" cy="9" r="2.5"></circle>
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
  width: 50px;
  height: 50px;
`;
