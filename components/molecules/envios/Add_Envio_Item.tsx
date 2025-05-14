import styled from "styled-components";
import { FC, useEffect, useRef, useState } from "react";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Modal_Content } from "../../atoms/modal/Modal_Content";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Add_Envio_Form } from "../../molecules/modal_forms/Add_Envio_Form";

interface AddEnvioItemProps {
  onClose: () => void;
  onSubmit: (envio: {
    clienteName: string;
    direccion: string;
    status: "pendiente" | "en_camino" | "entregando" | "cancelado";
    time?: string;
  }) => void;
}

export const Add_Envio_Item: FC<AddEnvioItemProps> = ({ onClose, onSubmit }) => {
  const [closing, setClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (envioData: {
    clienteName: string;
    direccion: string;
    status: "pendiente" | "en_camino" | "entregando" | "cancelado";
    time?: string;
  }) => {
    if (!envioData.clienteName.trim() || !envioData.direccion.trim()) {
      alert("Completa el nombre y la dirección del cliente");
      return;
    }
    onSubmit(envioData);
    setClosing(true);
  };
  

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
        <Add_Envio_Form onSubmit={handleSubmit} />
      </Modal_Content>
    </Modal_Overlay>
  );
};

