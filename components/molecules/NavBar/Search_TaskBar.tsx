import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Close_Icon } from "@/components/atoms/icons/Close_Icon";
import { Search_Icon } from "@/components/atoms/icons/Search_Icon";

export const Search_TaskBar: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setFocused(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  const showClear = inputValue.trim() !== "";

  return (
    <Search_Wrapper focused={focused}>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Filtrar..."
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <Icon_Container>
        <Search_Icon />
        {showClear && (
          <Clear_Icon onClick={handleClear}>
            <Close_Icon />
          </Clear_Icon>
        )}
      </Icon_Container>
    </Search_Wrapper>
  );
};

const Search_Wrapper = styled.div<{ focused: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: #f9f9f9;
  width: 9rem;
  /* width: ${({ focused }) => (focused ? "320px" : "180px")}; */
  transition: width 0.3s ease;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: 1rem;
  width: 100%;
  flex-grow: 1;
  height: 10px;
`;

const Icon_Container = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Clear_Icon = styled.div`
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
