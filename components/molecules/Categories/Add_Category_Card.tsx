import { FC } from "react";
import styled from "styled-components";

interface Props {
  onAddCategory: () => void;
}

const Card_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
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
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const Add_Text = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin: 8px 0 0 0;
`;

export const Add_Category_Card: FC<Props> = ({ onAddCategory }) => {
  return (
    <Card_Container onClick={onAddCategory}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>Agregar Categoría</Add_Text>
    </Card_Container>
  );
};
