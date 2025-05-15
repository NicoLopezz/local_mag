import { FC } from "react";
import styled from "styled-components";

export const Clock_Icon: FC = () => {
  return (
    <IconWrapper>
      <Svg
        stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx="8" cy="16" r="6"></circle><path d="M9.5 17.5 8 16.25V14"></path>
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
  width: 22px;
  height: 22px;
  transition: all 0.3s ease;
`;

const Svg = styled.svg`
  color: #000000;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
`;
