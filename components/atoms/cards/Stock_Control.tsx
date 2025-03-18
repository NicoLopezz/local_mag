import { FC } from "react";
import styled from "styled-components";

interface Props {
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const Stock_Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  border-top: 1px solid #ddd;
`;

const Stock_Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

const Stock_Value = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const Stock_Control: FC<Props> = ({ stock, onIncrease, onDecrease }) => {
  return (
    <Stock_Container>
      <Stock_Button onClick={onDecrease}>-</Stock_Button>
      <Stock_Value>{stock}</Stock_Value>
      <Stock_Button onClick={onIncrease}>+</Stock_Button>
    </Stock_Container>
  );
};
