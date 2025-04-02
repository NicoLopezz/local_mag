
import { FC, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: FC<Props> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <Toast_Container>
      {message}
    </Toast_Container>
  );
};

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const Toast_Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #333;
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  font-size: 0.95rem;
  z-index: 2000;
  animation: ${slideIn} 0.3s ease-out, ${slideOut} 0.3s ease-in 2.7s forwards;
`;
