import { FC } from "react";
import styled from "styled-components";

interface Props {
  name: string;
}

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: 500;
  color: #333;
`;

export const UserName: FC<Props> = ({ name }) => {
  return <Name>{name}</Name>;
};
