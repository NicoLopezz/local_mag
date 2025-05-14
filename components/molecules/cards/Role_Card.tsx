import { FC, useState } from "react";
import styled from "styled-components";
import { Card_Base } from "@/components/atoms/cards/Card_Base";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  empleados: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const Role_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  empleados,
  isSelected,
  onSelect,
}) => {
  const [currentCount, setCurrentCount] = useState(empleados);

  return (
    <Card_Base
      title={title}
      imageUrl={imageUrl}
      isSelected={isSelected}
      onClick={onSelect}
      description={description}
    >
      <Employee_Count>{currentCount} empleados</Employee_Count>
    </Card_Base>
  );
};



const Employee_Count = styled.span`
  font-size: 0.7rem;
  color: #888;
  margin-top: 5px;
`;
