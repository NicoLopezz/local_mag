import { FC } from "react";
import styled, { keyframes, css } from "styled-components";

interface Props {
  message: string;
  onClose: () => void;
  visible: boolean;
}

export const Toast: FC<Props> = ({ message, visible }) => {
  return <Toast_Container visible={visible}>{message}</Toast_Container>;
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Toast_Container = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0.5rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.button};
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  z-index: 99999999;
  animation: ${slideIn} 0.3s ease-out;
  transition: opacity 0.4s ease, transform 0.4s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? "translateX(0)" : "translateX(100%)")};

  @media (max-width: 768px) {
    right: 50%;
    transform: ${({ visible }) => (visible ? "translateX(50%)" : "translateX(150%)")};
    top: 1rem;
  }
`;
