import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  stock: number;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

export const Category_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  href,
  stock,
  isSelected,
  onSelect,
}) => {
  return (
    <Card_Container
      isSelected={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(title);
      }}
    >
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
font-size: ${({ theme }) => theme.fontSizes.text * 0.8}px;  color: #666;
  margin: 0;
`;

const Card_Stock = styled.span<{ stock: number }>`
  font-size: ${({ theme }) => theme.fontSizes.text * 0.9}px;
  font-weight: bold;
  color: ${({ stock }) => (stock > 0 ? "#28a745" : "#dc3545")};
`;
