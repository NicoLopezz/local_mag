import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  visible: boolean;
  onAccept: () => void;
}

export const Modal_Terms: FC<Props> = ({ visible, onAccept }) => {
  const { t } = useLang();
  const [shouldRender, setShouldRender] = useState(visible);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimatingOut(false);
      setClicked(false);
    } else if (shouldRender) {
      setAnimatingOut(true);
    }
  }, [visible]);

  const handleAnimationEnd = () => {
    if (animatingOut) {
      setShouldRender(false);
      setAnimatingOut(false);
    }
  };

  const handleAccept = () => {
    setClicked(true);
    setTimeout(() => {
      onAccept();
    }, 800);
  };

  if (!shouldRender) return null;

  return (
    <ModalContainer 
      $visible={visible} 
      $clicked={clicked}
      onAnimationEnd={handleAnimationEnd}
    >
      <ContentWrapper $clicked={clicked}>
        <Text>{t.login.cookies}</Text>
        <Button 
          onClick={handleAccept}
          $clicked={clicked}
        >
          {clicked ? "✓" : t.login.btnAcept}
        </Button>
      </ContentWrapper>
    </ModalContainer>
  );
};

const slideIn = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

const checkmark = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalContainer = styled.div<{ $visible: boolean; $clicked: boolean }>`
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  min-width: 300px;
  z-index: 999;
  animation: ${({ $visible }) => ($visible ? slideIn : slideOut)} 0.4s ease forwards;
`;

const ContentWrapper = styled.div<{ $clicked: boolean }>`
  background-color: ${({ $clicked }) => $clicked ? "#f0fff4" : "#fcfcfc"};
  color: #353535;
  padding: 1.2rem 1.5rem;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.15);
  border: ${({ $clicked }) => $clicked ? "1px solid #10B981" : "none"};
  animation: ${({ $clicked }) => $clicked ? pulse : "none"} 0.6s ease;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
`;

const Text = styled.p`
  font-size: 15px;
  margin: 0;
  flex: 1;
  @media (max-width: 1300px) {
    font-size: 13px;
  }
`;

const Button = styled.button<{ $clicked: boolean }>`
  background: ${({ $clicked }) => $clicked ? "#10B981" : "none"};
  color: ${({ $clicked }) => $clicked ? "white" : "#000000"};
  border: ${({ $clicked }) => $clicked ? "none" : "1px solid #00000020"};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 80px;
  
  animation: ${({ $clicked }) => $clicked ? checkmark : "none"} 0.5s ease;

  &:hover {
    background-color: ${({ $clicked }) => $clicked ? "#0d9f6e" : "#020202"};
    color: white;
    transform: ${({ $clicked }) => $clicked ? "none" : "scale(0.2)"};
  }

  &:active {
    transform: scale(0.58);
  }
`;