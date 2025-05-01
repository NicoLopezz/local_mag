import { FC } from "react";
import styled from "styled-components";

export const Cancel_Icon: FC = () => {
  return (
    <IconWrapper>
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      version="1.1"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
      <path d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"></path>
    </Svg>
    </IconWrapper>
  );
};

const Svg = styled.svg`
  color: black;
  transition: all 0.3s ease;
  width: 25px;
  height: 25px;
`;

const IconWrapper = styled.div`
  /* background-color: white; */
  border-radius: 50%;
  /* padding: 8px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #000000;
    width: 25px;
    height: 25px; 

    svg {
      color: white;
    }
  }
 `;