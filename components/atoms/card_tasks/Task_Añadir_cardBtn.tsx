import { FC } from "react";
import styled from "styled-components";

interface Props {
  onAddProduct: () => void;
}

export const Task_Añadir_cardBtn: FC<Props> = ({ onAddProduct }) => {
  return (
    <Card_Container onClick={onAddProduct}>
      <Add_Text>Añadir Card</Add_Text>
    </Card_Container>
  );
};


const Card_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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

const Add_Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: bold;
  color: #333;
  margin: 8px 0 0 0;
`;

