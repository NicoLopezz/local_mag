import { FC } from "react";
import styled from "styled-components";

interface Props {
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const Stock_Control_Add: FC<Props> = ({ stock, onIncrease, onDecrease }) => {
  const handleDecreaseClick = () => {
    onDecrease();
  };

  return (
    <Stock_Container>
      <Stock_Value>{stock}</Stock_Value>
      <Stock_Button onClick={handleDecreaseClick} aria-label="Aumentar Stock">
        +
      </Stock_Button>
    </Stock_Container>
  );
};

const Stock_Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding: 5px;
  border-top: 1px solid #ddd;
`;

const Stock_Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
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
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: bold;
`;
