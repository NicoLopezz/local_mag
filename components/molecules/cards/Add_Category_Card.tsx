import { FC } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  onAddCategory: () => void;
}

export const Add_Category_Card: FC<Props> = ({ onAddCategory }) => {
  const { t } = useLang();
  return (
    <Card_Container onClick={onAddCategory}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.services.categories.addCategory}</Add_Text>
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  border: 2px dashed #ccc;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Add_Icon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Add_Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0 0 0;
`;
