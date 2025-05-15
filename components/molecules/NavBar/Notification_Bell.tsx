import { FC, useState } from "react";
import styled from "styled-components";
import { Bell_Icon } from "@/components/atoms/icons/Bell_Icon";
import { Notifications_Sidebar } from "./Notifications_Sidebar";



export const NotificationBell: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); 
  
  return (
    <>
      <IconContainer onClick={() => setSidebarOpen(true)}>
        <Bell_Icon onClick={() => setSidebarOpen(true)} />
        {unreadCount > 0 && (
          <Badge>{unreadCount > 9 ? '9+' : unreadCount}</Badge>
        )}
      </IconContainer>
      
      <Notifications_Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUnreadCountChange={setUnreadCount} 
      />
    </>
  );
};

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
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
  
  z-index: 1;
`;