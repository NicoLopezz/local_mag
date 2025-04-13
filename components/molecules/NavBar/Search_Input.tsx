import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {Close_Icon} from "@/components/atoms/icons/Close_Icon";
import { Search_Icon } from "@/components/atoms/icons/Search_Icon";

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
    <Search_Wrapper focused={focused}>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
