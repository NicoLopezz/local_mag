import { FC, useState } from "react";
import styled from "styled-components";

interface NotificationItem {
  id: number;
  title: string;
  details: string;
  date: string;
  time: string;
  isRead: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Notifications_Sidebar: FC<Props> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Nueva actualización disponible",
      details: "La versión 2.5 incluye mejoras de rendimiento",
      date: "Hoy",
      time: "10:30 AM",
      isRead: false
    },
    {
      id: 2,
      title: "Tarea completada",
      details: "El informe mensual ha sido enviado",
      date: "Hoy",
      time: "09:15 AM",
      isRead: false
    },
    {
      id: 3,
      title: "Recordatorio de reunión",
      details: "Reunión de equipo en 15 minutos",
      date: "Ayer",
      time: "04:45 PM",
      isRead: true
    },
    {
      id: 4,
      title: "Mensaje nuevo",
      details: "Tienes un nuevo mensaje de Juan Pérez",
      date: "Ayer",
      time: "11:20 AM",
      isRead: true
    },
    {
      id: 5,
      title: "Pago recibido",
      details: "Se ha procesado tu pago mensual",
      date: "15 Abr",
      time: "08:00 AM",
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ));
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      
      <SidebarContainer $isOpen={isOpen}>
        <Header>
          <Title>Notificaciones</Title>
          <CloseButton onClick={onClose} aria-label="Cerrar notificaciones">
            ✕
          </CloseButton>
        </Header>
        
        <TabsContainer>
          <Tab $active>
            No leídas <UnreadBadge>{unreadCount}</UnreadBadge>
          </Tab>
          <Tab onClick={markAllAsRead}>
            Marcar como leídas
          </Tab>
        </TabsContainer>

        {unreadCount > 0 && (
          <>
            <SectionHeader>No leídas</SectionHeader>
            {notifications.filter(n => !n.isRead).map(notification => (
              <NotificationCard 
                key={notification.id} 
                $isRead={notification.isRead}
                onClick={() => toggleReadStatus(notification.id)}
              >
                <NotificationTitle $isRead={notification.isRead}>
                  {notification.title}
                </NotificationTitle>
                <NotificationDetails $isRead={notification.isRead}>
                  {notification.details}
                </NotificationDetails>
                <NotificationFooter>
                  <NotificationTime>
                    {notification.date} · {notification.time}
                  </NotificationTime>
                  <ViewDetails>
                    Ver detalle &gt;
                  </ViewDetails>
                </NotificationFooter>
              </NotificationCard>
            ))}
          </>
        )}

        <SectionHeader>Leídas</SectionHeader>
        {notifications.filter(n => n.isRead).map(notification => (
          <NotificationCard 
            key={notification.id} 
            $isRead={notification.isRead}
            onClick={() => toggleReadStatus(notification.id)}
          >
            <NotificationTitle $isRead={notification.isRead}>
              {notification.title}
            </NotificationTitle>
            <NotificationDetails $isRead={notification.isRead}>
              {notification.details}
            </NotificationDetails>
            <NotificationFooter>
              <NotificationTime>
                {notification.date} · {notification.time}
              </NotificationTime>
              <ViewDetails>
                Ver detalle &gt;
              </ViewDetails>
            </NotificationFooter>
          </NotificationCard>
        ))}
      </SidebarContainer>
    </>
  );
};


const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 380px;
  max-width: 90vw;
  background-color: #f8f9fa;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  gap: 15px;
`;

const Tab = styled.div<{ $active?: boolean }>`
  padding: 5px 10px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 0.9rem;
  color: ${({ $active }) => ($active ? '#0a3662' : '#555')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ $active }) => ($active ? '#f0f7ff' : 'transparent')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const UnreadBadge = styled.span`
  background-color: #000000;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: bold;
`;

const SectionHeader = styled.div`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #555;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NotificationCard = styled.div<{ $isRead: boolean }>`
  padding: 15px;
  margin: 10px 15px;
  background-color: ${({ $isRead }) => ($isRead ? '#ffffff' : '#f8fbff')};
  border-radius: 8px;
  border-left: ${({ $isRead }) => ($isRead ? 'none' : '3px solid #051f38')};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;
  opacity: ${({ $isRead }) => ($isRead ? 0.9 : 1)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const NotificationTitle = styled.h4<{ $isRead: boolean }>`
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  font-weight: ${({ $isRead }) => ($isRead ? 500 : 600)};
  color: ${({ $isRead }) => ($isRead ? '#555' : '#333')};
`;

const NotificationDetails = styled.p<{ $isRead: boolean }>`
  margin: 0 0 15px 0;
  font-size: 0.85rem;
  color: ${({ $isRead }) => ($isRead ? '#777' : '#555')};
  line-height: 1.4;
`;

const NotificationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
`;

const NotificationTime = styled.span`
  color: #888;
`;

const ViewDetails = styled.a`
  color: #1976d2;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
