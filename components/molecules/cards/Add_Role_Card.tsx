import { FC } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  onAddRole: () => void;
}

export const Add_Role_Card: FC<Props> = ({ onAddRole }) => {
  const {t} = useLang();
  return (
    <Card_Container onClick={onAddRole}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.roles.addRole}</Add_Text>
    </Card_Container>
  );
};



const Card_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `2px solid ${theme.colors.contenedores}`
      : `1px solid ${theme.colors.contenedores}`};
  box-shadow: ${({ isSelected, theme }) =>
    isSelected
      ? `0 0 10px ${theme.colors.title}40`
      : `0px 4px 8px ${theme.colors.title}10`};
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  border: 2px dashed #ccc;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-color: #999;
  }
`;

const Add_Icon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Add_Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0 0 0;
`;

