import { FC } from "react";
import styled from "styled-components";
import { Sidebar_Icon } from "../../atoms/sidebar/Sidebar_Icon";
import { Sidebar_Text } from "../../atoms/sidebar/Sidebar_Text";
import { Setings_Icon } from "@/components/atoms/icons/sidebar_icons/Setings_Icon";

const Settings_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  cursor: pointer;
  background-color: transparent;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Sidebar_Item_Settings: FC = () => {
  return (
    <Settings_Wrapper>
      <Sidebar_Icon icon={<Setings_Icon />} />
      <Sidebar_Text text="Settings" />
    </Settings_Wrapper>
  );
};
