import { FC } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export const Task_Card_Container: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: red;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: grab;
`;
