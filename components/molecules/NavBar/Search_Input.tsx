import { FC, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: 1rem;
  width: 150px;
  flex-grow: 1;
`;

export const SearchInput: FC = () => {
  const [search, setSearch] = useState("");

  return (
    <SearchWrapper>
      <Input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch color="#666" />
    </SearchWrapper>
  );
};
