import styled from "styled-components";

export const Close_Button = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;
