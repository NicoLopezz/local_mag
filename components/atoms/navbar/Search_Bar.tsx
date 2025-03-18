import { FC } from "react";
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
`;

export const SearchBar: FC = () => {
  return (
    <SearchWrapper>
      <Input type="text" placeholder="Buscar..." />
      <FaSearch color="#666" />
    </SearchWrapper>
  );
};
