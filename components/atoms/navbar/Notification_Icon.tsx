import { FC } from "react";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";

interface Props {
  count: number;
}

const IconWrapper = styled.div`
  position: relative;
  font-size: 1.2rem;
  color: #333;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationIcon: FC<Props> = ({ count }) => {
  return (
    <IconWrapper>
      <FaBell />
      {count > 0 && <Badge>{count}</Badge>}
    </IconWrapper>
  );
};
