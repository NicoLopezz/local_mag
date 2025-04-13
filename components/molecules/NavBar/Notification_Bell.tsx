import { FC, useState } from "react";
import styled from "styled-components";
import {Bell_Icon} from "@/components/atoms/icons/Bell_Icon";

const IconWrapper = styled.div`
  position: relative;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ffffff;
  color: #000000;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1px solid #02203f;
`;

export const NotificationBell: FC = () => {
  const [count, setCount] = useState(3);

  return (
    <IconWrapper>
      <Bell_Icon />
      {count > 0 && <Badge>{count}</Badge>}
    </IconWrapper>
  );
};
