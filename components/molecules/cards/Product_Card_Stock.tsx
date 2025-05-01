import { FC, useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Stock_Control_Add } from "../../atoms/cards/Stock_Control_Add";
import { useTransactions } from "@/context/Transacciones_Context";
interface Props {
  title: string;
  description: string;

  href: string;
  imageUrl: string;
  productCode: string;
  stock: number;
  isSelected: boolean;
  onSelect: (productCode: string) => void;
  category: string;
  onTransactionCommit: (decrease: number, title: string) => void;

}

export const Product_Card_Stock: FC<Props> = ({
  title,
  description,
  imageUrl,
  productCode,
  stock,
  isSelected,
  category,
  onSelect,
  onTransactionCommit,
}) => {
  const [currentStock, setCurrentStock] = useState(stock);
  const pendingActions = useRef<{increase: number; decrease: number}>({ increase: 0, decrease: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stockRef = useRef(currentStock);
  const { addTransaction } = useTransactions();

  useEffect(() => {
    stockRef.current = currentStock;
  }, [currentStock]);

  const handleIncrease = useCallback(() => {
    const newStock = stockRef.current + 1;
    setCurrentStock(newStock);
    pendingActions.current.increase += 1;
    schedulePendingAction();
  }, []);

  const handleDecrease = useCallback(() => {
    const newStock = Math.max(stockRef.current - 1, 0);
    setCurrentStock(newStock);
    pendingActions.current.decrease += 1;
    schedulePendingAction();
  }, [title, productCode, category, addTransaction]);

  const schedulePendingAction = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  
    timerRef.current = setTimeout(() => {
      if (pendingActions.current.decrease > 0) {
        addTransaction("ingreso", {
          title,
          productCode,
          category,
          units: pendingActions.current.decrease
        });
        onTransactionCommit(pendingActions.current.decrease, title);
        pendingActions.current.decrease = 0;

      }
    }, 600);
  }, [title, productCode, category, addTransaction, onTransactionCommit]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(productCode);
  };

  return (
    <Card_Container isSelected={isSelected}>
      <Card_Image>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Card_Image>
      <Card_Content onClick={handleClick}>
        <Card_Title>{title}</Card_Title>
      </Card_Content>
      <Stock_Control_Add 
        stock={currentStock} 
        onIncrease={handleIncrease} 
        onDecrease={handleDecrease} 
      />
    </Card_Container>
  );
};


const Card_Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  border: ${({ isSelected }) => (isSelected ? "2px solid #02203f" : "1px solid #ddd")};
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0 0 10px rgba(0, 123, 255, 0.3)" : "0px 4px 8px rgba(0, 0, 0, 0.05)"};
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  color: inherit;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Card_Image = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #f0f0f0;
`;

const Card_Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Card_Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: bold;
  margin: 5px 0;
  color: #333;
`;

const Card_Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: #666;
  margin: 0;
`;

const Product_Code = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: #888;
  margin-top: 5px;
`;
