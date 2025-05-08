import { FC, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  name: string;
  role: string;
  imageUrl: string;
  email: string;
  phone: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const Empleado_Card: FC<Props> = ({
  name,
  role,
  imageUrl,
  email,
  phone,
  isSelected,
  onSelect,
}) => {
  const [taskCount, setTaskCount] = useState(0);

  const handleIncrease = () => setTaskCount((prev) => prev + 1);
  const handleDecrease = () => setTaskCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <Card_Container isSelected={isSelected} onClick={handleClick}>
      <Card_Image>
        <Image src={imageUrl} alt={name} fill style={{ objectFit: "cover" }} />
      </Card_Image>
      <Card_Content>
        <Card_Title>{name}</Card_Title>
        <Card_Description>{role}</Card_Description>
        <Empleado_Email>{email}</Empleado_Email>
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
  color: #333;
`;

const Card_Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: #666;
  margin: 0;
`;

const Empleado_Email = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text * 0.8}px;
  color: #888;
  margin-top: 5px;
`;
