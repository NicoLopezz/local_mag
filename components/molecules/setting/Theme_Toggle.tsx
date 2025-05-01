import { FC } from "react";
import styled from "styled-components";
import { Sun_Icon } from "@/components/atoms/icons/setting/Sun_Icon";
import { Moon_Icon } from "@/components/atoms/icons/setting/Moon_Icon";

interface Props {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const Theme_Toggle: FC<Props> = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <ToggleContainer onClick={handleToggle} active={isDark}>
      <Slider active={isDark}>
        {isDark ? <Moon_Icon /> : <Sun_Icon />}
      </Slider>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div<{ active: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 999px;
  background-color: ${({ active, theme }) =>
  active ? theme.colors.toggleOn : theme.colors.toggleOff};

  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
`;

const Slider = styled.div<{ active: boolean }>`
  background-color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${({ active }) => (active ? "calc(100% - 25px)" : "3px")};
  transition: left 0.3s ease, box-shadow 0.3s ease;

  box-shadow: ${({ active }) =>
    active
      ? "5px "  
      : "5px"}; 

  svg {
    width: 14px;
    height: 14px;
    color: ${({ active }) => (active ? "#111" : "#555")};
    transition: color 0.3s ease;
  }
`;

