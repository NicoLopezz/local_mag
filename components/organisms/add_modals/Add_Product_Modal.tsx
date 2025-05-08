import { FC, useEffect, useState } from "react";
import { Modal } from "../../molecules/modals/Modal";
import { Modal_Content } from "../../atoms/modal/Modal_Content";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Add_Product_Form } from "../../molecules/modal_forms/Add_Product_Form";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
}

export const Add_Product_Modal: FC<Props> = ({ onClose, onSubmit }) => {
  const [closing, setClosing] = useState(false);

  const handleCloseRequest = () => {
    setClosing(true);
  };

  const handleAnimationEnd = () => {
    if (closing) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseRequest();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <Modal isOpen={!closing} onClose={handleCloseRequest}>
      <Modal_Content
        className={closing ? "closing" : ""}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <Close_Button onClick={handleCloseRequest}>×</Close_Button>

        <Add_Product_Form
          onSubmit={() => {
            onSubmit();
            handleCloseRequest();
          }}
        />
      </Modal_Content>
    </Modal>
  );
};
