import { FC } from "react";
import styled from "styled-components";
import { Modal_Tab_Button } from "../../atoms/modal/Modal_Tab_Button";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tab_Navigation: FC<Props> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Tabs_Container>
      {tabs.map((tab) => (
        <Modal_Tab_Button key={tab} active={tab === activeTab} onClick={() => onTabChange(tab)}>
          {tab}
        </Modal_Tab_Button>
      ))}
    </Tabs_Container>
  );
};

const Tabs_Container = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;
