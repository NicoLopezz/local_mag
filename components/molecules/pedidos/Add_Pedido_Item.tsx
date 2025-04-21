import styled from "styled-components";
import { FC, useEffect, useRef, useState } from "react";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Modal_Content } from "../../atoms/modal/Modal_Content";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Add_Pedido_Form } from "../../molecules/modal_forms/Add_Pedido_Form";

interface AddPedidoItemProps {
  onClick?: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const Add_Pedido_Item = ({ onClose, onClick, onSubmit}: AddPedidoItemProps) => {
    const [closing, setClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setClosing(true);
    }
  };

  const handleAnimationEnd = () => {
    if (closing) onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClosing(true);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);
  
  
  
    return (
        <Modal_Overlay
        onClick={handleOverlayClick}
        className={closing ? "closing" : ""}
        onAnimationEnd={handleAnimationEnd}
      >
        <Modal_Content ref={contentRef}>
          <Close_Button onClick={() => setClosing(true)}>×</Close_Button>
  
          <Add_Pedido_Form
            onSubmit={() => {
              onSubmit();
              setClosing(true);
            }}
          />
        </Modal_Content>
      </Modal_Overlay>
  );
};

const AddPedidoContainer = styled.div`
  margin-top: 3%;  
  background: #000;
  color: #fff;
  width: 20%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const AddIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const AddText = styled.span`
  font-size: 0.9rem;
`;