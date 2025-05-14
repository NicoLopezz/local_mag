import styled from "styled-components";

export const Close_Button = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s;
`;
