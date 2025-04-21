import { FC, useEffect, useRef, useState } from "react";
import { Modal_Content } from "../../atoms/modal/Modal_Content";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Add_Pedido_Form } from "../../molecules/modal_forms/Add_Pedido_Form";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
}

export const Add_Pedido_Modal: FC<Props> = ({ onClose, onSubmit }) => {
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
