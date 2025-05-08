import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Modal_Overlay
      className={!isOpen ? "closing" : ""}
      onClick={onClose}
      onAnimationEnd={() => {
        if (!isOpen) {
          console.log("✔️ ANIMACIÓN TERMINADA - CIERRE MODAL");
          onClose();
        }
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </Modal_Overlay>,
    document.body
  );
};
