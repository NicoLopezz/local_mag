import styled from "styled-components";

interface Props {
  active: boolean;
}

export const Modal_Tab_Button = styled.button<Props>`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;

  &:hover {
    transform: scale(1.15);
  }
`;
