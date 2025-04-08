import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { Tasks_Board } from "@/components/organisms/tasks/Tasks_Board";
import { Priority_View } from "@/components/organisms/tasks/Priority_View";
import { motion, AnimatePresence } from "framer-motion";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Tasks: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "prioridades">("all");

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Board_Wrapper>
            <Page_Title>Tasks</Page_Title>
            <Tabs_Container>
              <Tab_Button
                isActive={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              >
                All Tasks
                {activeTab === "all" && <Underline layoutId="underline" />}
              </Tab_Button>
              <Tab_Button
                isActive={activeTab === "prioridades"}
                onClick={() => setActiveTab("prioridades")}
              >
                Prioridades
                {activeTab === "prioridades" && (
                  <Underline layoutId="underline" />
                )}
              </Tab_Button>
            </Tabs_Container>

            <AnimatePresence mode="wait">
              {activeTab === "all" && (
                <Motion_Section
                  key="all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tasks_Board />
                </Motion_Section>
              )}
              {activeTab === "prioridades" && (
                <Motion_Section
                  key="prioridades"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Priority_View />
                </Motion_Section>
              )}
            </AnimatePresence>
          </Board_Wrapper>
        </Content_Area>
      </Main_Content>
    </Page_Container>
  );
};

const Page_Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0px;
  flex-grow: 1;
`;

const Content_Area = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  max-width: calc(100vw - ${Sidebar_Width});
  padding-top: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: 5rem;
`;

const Page_Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--dark-blue);
`;

const Board_Wrapper = styled.div`
  /* background-color: blue; */
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 800px;
  width: 90%;
`;

const Tabs_Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Tab_Button = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #000000;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, text-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    text-shadow: 0px 2px 6px rgb(235, 235, 235);
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.2rem;
  height: 2px;
  background-color: #6c6c6c;
  border-radius: 2px;
`;

const Text_Prioridades = styled.div`
  color: #000000;
  font-size: 1rem;
`;

const Motion_Section = styled(motion.div)`
  width: 100%;
`;

export default Tasks;
