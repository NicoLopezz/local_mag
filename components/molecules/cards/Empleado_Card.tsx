import { FC, useState } from "react";
import { Card_Base } from "@/components/atoms/cards/Card_Base";
import styled from "styled-components";

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
  return (
    <Card_Base
      title={name}
      imageUrl={imageUrl}
      isSelected={isSelected}
      onClick={onSelect}
    >
      <Card_Description>{role}</Card_Description>
      <Empleado_Email>{email}</Empleado_Email>
    </Card_Base>
  );
};

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
