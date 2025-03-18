import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
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

const Card_Stock = styled.span<{ stock: number }>`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ stock }) => (stock > 0 ? "#28a745" : "#dc3545")};
`;

export const Category_Card: FC<Props> = ({ title, description, imageUrl, href, stock }) => {
  return (
    <Card_Container href={href}>
      <Card_Image>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Card_Image>
      <Card_Content>
        <Card_Title>{title}</Card_Title>
        <Card_Description>{description}</Card_Description>
        <Card_Stock stock={stock}>Stock: {stock > 0 ? stock : "Agotado"}</Card_Stock>
      </Card_Content>
    </Card_Container>
  );
};
