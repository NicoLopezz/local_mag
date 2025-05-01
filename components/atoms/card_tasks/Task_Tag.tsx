
import { FC } from "react";
import styled from "styled-components";

interface Props {
  tag: string;
}

export const Task_Tag: FC<Props> = ({ tag }) => {
  return <Tag>{tag}</Tag>;
};

const Tag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: var(--grey);
  margin-top: 4px;
`;
