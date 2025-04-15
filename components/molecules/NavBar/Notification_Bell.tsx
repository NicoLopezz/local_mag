import { FC, useState } from "react";
import styled from "styled-components";
import {Bell_Icon} from "@/components/atoms/icons/Bell_Icon";
import { Notifications_Sidebar } from "./Notifications_Sidebar";

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
  background: #e20505;
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: bold;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 0.1px solid #02203f; */
`;

export const NotificationBell: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Bell_Icon onClick={() => setSidebarOpen(true)} />
      <Notifications_Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};
