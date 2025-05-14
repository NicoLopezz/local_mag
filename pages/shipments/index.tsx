import type { NextPage } from "next";
import styled from "styled-components";
import { Envios_Board } from "@/components/organisms/envios/Envios_Board";



const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Envios: NextPage = () => {
  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
            <Envios_Board />
        </Content_Area>
      </Main_Content>
    </Page_Container>
  );
};

const Page_Container = styled.div`
  display: flex;
  width: 100%;
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
  flex-direction: column;
  padding: 20px;
  max-width: calc(100vw - ${Sidebar_Width});
  margin-left: 6rem;
  margin-top: 1rem;
`;

export default Envios;
