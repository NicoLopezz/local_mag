import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Text_Wrapper = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
`;




export const Sidebar_Text: FC<Props> = ({ text }) => {
  return <Text_Wrapper>{text}</Text_Wrapper>;
};
