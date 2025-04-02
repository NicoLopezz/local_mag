import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Navbar } from "../organisms/navbar/Navbar";
import { Sidebar } from "../organisms/sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

const Layout_Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding-top: 1rem;
`;

export const Main_Layout: FC<Props> = ({ children }) => {
  return (
    <Layout_Container>
      <Sidebar />
      <Content>
        <Navbar userName="Matías" userImage="/images/profile.jpg" />
        {children}
      </Content>
    </Layout_Container>
  );
};
