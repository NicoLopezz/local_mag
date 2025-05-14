import { FC } from "react";
import styled from "styled-components";

export const Microsoft_Icon: FC = () => {
  return (
    <IconWrapper>
      <Svg
        stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path>
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
