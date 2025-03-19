import { FC, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Stock_Control } from "../../atoms/cards/Stock_Control";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  productCode: string;
  stock: number;
}

const Card_Container = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
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
  font-size: 0.9rem;
  font-weight: bold;
  margin: 5px 0;
  color: #333;
`;

const Card_Description = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
`;

const Product_Code = styled.span`
  font-size: 0.7rem;
  color: #888;
  margin-top: 5px;
`;

export const Product_Card: FC<Props> = ({ title, description, imageUrl, href, productCode, stock }) => {
    const [currentStock, setCurrentStock] = useState(stock);
  
    const handleIncrease = () => setCurrentStock((prev) => prev + 1);
    const handleDecrease = () => setCurrentStock((prev) => (prev > 0 ? prev - 1 : 0));
  
    return (
        
      <Card_Container href={href || "#"}>
        <Card_Image>
          <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
        </Card_Image>
        <Card_Content>
          <Card_Title>{title}</Card_Title>
          <Card_Description>{description}</Card_Description>
          <Product_Code>{productCode}</Product_Code>
        </Card_Content>
        <Stock_Control stock={currentStock} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      </Card_Container>
    );
  };
  
