import styled from "styled-components";

interface Props {
  active: boolean;
}

export const Modal_Tab_Button = styled.button<Props>`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "transparent" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: #222;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;
