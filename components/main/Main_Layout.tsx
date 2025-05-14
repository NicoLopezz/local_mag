import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Navbar } from "../organisms/navbar/Navbar";
import { Sidebar } from "../organisms/sidebar/Sidebar";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

interface Props {
  children: ReactNode;
}

export const Main_Layout: FC<Props> = ({ children }) => {
  return (
    <Layout_Container>
      <Sidebar />
      <Content>
        <Navbar userName="" userImage="/images/profile.jpg" />
        {children}
      </Content>
    </Layout_Container>
  );
};


const Layout_Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  flex-grow: 1;
  padding-top: 1rem;
  
`;