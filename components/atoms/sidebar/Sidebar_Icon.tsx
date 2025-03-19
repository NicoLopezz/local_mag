import { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  icon: ReactNode;
}

const Icon_Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Sidebar_Icon: FC<Props> = ({ icon }) => {
  return <Icon_Wrapper>{icon}</Icon_Wrapper>;
};
