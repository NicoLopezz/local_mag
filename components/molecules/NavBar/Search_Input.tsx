import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export const SearchInput: FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = typeof router.query.search === "string" ? router.query.search : "";
  const [inputValue, setInputValue] = useState(search);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setFocused(false);
    }
  };

  useEffect(() => {
    setInputValue(search);
    if (search.trim() !== "") {
      setFocused(true);
    }
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  
    if (value.trim() === "") {
      router.replace("/productos");
      return;
    }
  
    const params = new URLSearchParams();
  
    params.set("search", value);
  
    if (router.query.category) {
      params.set("category", router.query.category as string);
    }
  
    router.replace(`/productos?${params.toString()}`);
  };
  
  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
    router.replace("/productos");
  };

  const showClear = inputValue.trim() !== "";

  return (
    <SearchWrapper focused={focused}>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <IconContainer>
        <SearchIcon visible={!showClear} />
        <ClearIcon visible={showClear} onClick={handleClear} />
      </IconContainer>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div<{ focused: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 20px;
  background-color: #f9f9f9;
  width: ${({ focused }) => (focused ? "320px" : "180px")};
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
`;

const IconContainer = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`;

const SearchIcon = styled(FaSearch)<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.2s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  color: #666;
`;

const ClearIcon = styled(FaTimes)<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.2s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  color: red;
  cursor: pointer;
`;
