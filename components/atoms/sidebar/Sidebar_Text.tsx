import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Text_Wrapper = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Sidebar_Text: FC<Props> = ({ text }) => {
  return <Text_Wrapper>{text}</Text_Wrapper>;
};
