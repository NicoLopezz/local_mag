import { FC } from "react";
import styled from "styled-components";

const Search_Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  width: 150px;
`;

export const Search_Bar: FC = () => {
  return (
    <Search_Wrapper>
      <Input type="text" placeholder="Buscar..." />
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z" />
      </svg>
    </Search_Wrapper>
  );
};
