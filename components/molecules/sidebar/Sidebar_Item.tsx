import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Sidebar_Icon } from "../../atoms/sidebar/Sidebar_Icon";
import { Sidebar_Text } from "../../atoms/sidebar/Sidebar_Text";

interface Props {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

const Item_Wrapper = styled.a<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem; /* Tamaño uniforme de cada item */
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#2f3a4a" : "transparent")};
  text-align: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;



export const Sidebar_Item: FC<Props> = ({ icon, text, active }) => {
  return (
    <Item_Wrapper active={active}>
      <Sidebar_Icon icon={icon} />
      <Sidebar_Text text={text} />
    </Item_Wrapper>
  );
};
