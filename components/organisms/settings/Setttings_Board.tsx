import { FC, useState } from "react";
import styled from "styled-components";
import { Settings_General } from "./Settings_General";
import { Settings_Account } from "./Settings_Account";

interface SettingsBoardProps {
  date?: Date;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const Settings_Board: FC<SettingsBoardProps> = ({ date = new Date() }) => {
  const [activeTab, setActiveTab] = useState<"general" | "account">("general");
  

  return (
    <BoardWrapper>
      <HeaderContainer>
        <PageTitle>Settings</PageTitle>
      </HeaderContainer>

      <Tabs>
        <TabButton
          active={activeTab === "general"}
          onClick={() => setActiveTab("general")}
        >
          General
        </TabButton>
        <TabButton
          active={activeTab === "account"}
          onClick={() => setActiveTab("account")}
        >
          Account
        </TabButton>
      </Tabs>

      <Divider />

      <TabContent key={activeTab}>
        {activeTab === "general" ? <Settings_General /> : <Settings_Account />}
      </TabContent>
    </BoardWrapper>
  );
};

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.subtitle-2}px;
  font-weight: 600;
  border-radius: 6px;
  background-color: ${({ active, theme }) =>
  active ? theme.colors.button : theme.colors.toggleOff};
  color: ${({ active }) => (active ? "white" : "#333")};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0);
  color: #2d3748;
  overflow-y: hidden;
  margin-bottom: 2rem;

`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;


const PageTitle = styled.h1` 
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.title}px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e2e8f0;
`;

const TabContent = styled.div`
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
