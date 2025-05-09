import { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export const Add_Card_Base: FC<Props> = ({ onClick, children }) => {
  return <Card_Container onClick={onClick}>{children}</Card_Container>;
};

export const Add_Icon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Add_Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0 0 0;
`;

const Card_Container = styled.div`
  background-color: ${({ theme }) => theme.colors.contenedores};
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  border: 2px dashed #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-color: #999;
  }
`;
