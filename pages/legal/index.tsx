import type { NextPage } from "next";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Legales: NextPage = () => {
  const { t } = useLang();

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Page_Title>{t.legal.pageTitle}</Page_Title>
        </Content_Area>
      </Main_Content>
    </Page_Container>
  );
};

const Page_Container = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const Content_Area = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: calc(100vw - ${Sidebar_Width});
  height: 100%;
  overflow: hidden;
`;

const Page_Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.title};
`;

export default Legales;
