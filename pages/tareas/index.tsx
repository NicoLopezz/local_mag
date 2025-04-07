import type { NextPage } from "next";
import styled from "styled-components";
import { Tasks_Board } from "@/components/organisms/card_tasks/Tasks_Board";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Tasks: NextPage = () => {
  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Board_Wrapper>
            <Page_Title>Tasks</Page_Title>
            <Tasks_Board />
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
  margin-bottom: 1.5rem;
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



export default Tasks;
