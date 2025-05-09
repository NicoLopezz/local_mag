import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Close_Icon } from "@/components/atoms/icons/Close_Icon";
import { Search_Icon } from "@/components/atoms/icons/Search_Icon";
import { useLang } from "@/context/Language_Context";

export const SearchInput: FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPath = router.pathname;
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
      router.replace(currentPath);
      return;
    }

    const params = new URLSearchParams();
    params.set("search", value);

    const filterKey = getFilterKey(currentPath);
    const filterValue = router.query[filterKey];

    if (filterKey && typeof filterValue === "string") {
      params.set(filterKey, filterValue);
    }

    router.replace(`${currentPath}?${params.toString()}`);
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
    router.replace(currentPath);
  };

  const {t} = useLang();

  const showClear = inputValue.trim() !== "";

  return (
    <Search_Wrapper focused={focused}>
      <Input
        ref={inputRef}
        type="text"
        placeholder= {t.searchbar.placeholder}
        value={inputValue}
        onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
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

const getFilterKey = (path: string): string => {
  if (path.includes("/products")) return "category";
  if (path.includes("/employees")) return "roles";
  if (path.includes("/services")) return "tipo";
  return "";
};

const Search_Wrapper = styled.div<{ focused: boolean }>`
  display: flex;
  align-items: center;
  border: 0.1px solid ${({ theme }) => theme.colors.title};;
  border-radius: 20px;
  padding: 5px 20px;
  background-color: ${({ theme }) => theme.colors.neutral.light};
  width: 350px;
  transition: width 0.3s ease;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;
