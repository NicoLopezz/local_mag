import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  imageUrl?: string;
  stock?: number;
  isSelected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;

}

export const Card_Base: FC<Props> = ({
  title,
  description,
  imageUrl,
  stock,
  isSelected = false,
  children,
  onClick,
}) => {
  return (
    <Card_Container isSelected={isSelected} onClick={onClick}>
      {imageUrl && (
        <Card_Image>
          <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
        </Card_Image>
      )}
      <Card_Content>
        <Card_Title>{title}</Card_Title>
        {children}
        {description && <Card_Description>{description}</Card_Description>}
        {stock !== undefined && (
          <Card_Stock stock={stock}>
            Stock: {stock > 0 ? stock : "Agotado"}
          </Card_Stock>
        )}
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
  background-color: ${({ theme }) => theme.colors.contenedores};
  /* background-color: red; */
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `2px solid ${theme.colors.contenedores}`
      : `1px solid ${theme.colors.contenedores}`};
  box-shadow: ${({ isSelected, theme }) =>
    isSelected
      ? `0 0 10px ${theme.colors.title}40`
      : `0px 4px 8px ${theme.colors.title}10`};
  transition: all 0.1s ease-in-out;
  text-decoration: none;
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
  background-color: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.text};
`;

const Card_Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text * 0.8}px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Card_Stock = styled.span<{ stock: number }>`
  font-size: ${({ theme }) => theme.fontSizes.text * 0.9}px;
  font-weight: bold;
  color: ${({ stock }) => (stock > 0 ? "#28a745" : "#dc3545")};
`;
