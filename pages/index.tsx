import type { NextPage } from "next";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";


const Informes: NextPage = () => {

  const { t } = useLang();

  return (
    <Page_Container>      
      <Main_Content>
        <Content_Area>
          <Page_Title>{t.index.title}</Page_Title>
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
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - ${Sidebar_Width});
`;

const Page_Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

export default Informes;
