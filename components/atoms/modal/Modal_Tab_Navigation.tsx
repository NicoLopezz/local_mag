import { FC, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Modal_Tab_Button } from "@/components/atoms/modal/Modal_Tab_Button";
import { motion } from "framer-motion";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Modal_Tab_Navigation: FC<Props> = ({ tabs, activeTab, onTabChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = tabs.indexOf(activeTab);
    const tabElements = container.querySelectorAll<HTMLButtonElement>("button");

    if (tabElements[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabElements[activeIndex];
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, tabs]);

  return (
    <Tabs_Container ref={containerRef}>
      {tabs.map((tab) => (
        <Modal_Tab_Button
          key={tab}
          active={tab === activeTab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Modal_Tab_Button>
      ))}

      <Active_Indicator
        layout
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </Tabs_Container>
  );
};

const Tabs_Container = styled.div`
  position: relative;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const Active_Indicator = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background-color: #222;
  border-radius: 4px;
`;
