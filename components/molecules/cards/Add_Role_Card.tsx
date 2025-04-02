import { FC } from "react";
import styled from "styled-components";

interface Props {
  onAddRole: () => void;
}

export const Add_Role_Card: FC<Props> = ({ onAddRole }) => {
  return (
    <Card_Container onClick={onAddRole}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>Agregar Rol</Add_Text>
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

