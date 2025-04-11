import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const Service_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  isSelected,
  onSelect,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <Card_Container isSelected={isSelected} onClick={handleClick}>
      <Card_Image>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Card_Image>
      <Card_Content>
        <Card_Title>{title}</Card_Title>
        <Card_Description>{description}</Card_Description>
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
  padding-top: 6px;
`;

const Card_Title = styled.h3`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
`;

const Card_Description = styled.p`
  font-size: 0.75rem;
  color: #666;
`;
