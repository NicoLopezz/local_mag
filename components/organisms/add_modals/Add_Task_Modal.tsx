import { FC, useEffect, useRef, useState } from "react";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Modal_Content } from "../../atoms/modal/Modal_Content";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Add_Task_Form } from "../../molecules/modal_forms/Add_Task_Form";

interface Props {
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    priority?: string;
    dueDate?: string;
    assignee?: string;
    tags?: string;
  }) => void;
}
export const Add_Task_Modal: FC<Props> = ({ onClose, onSubmit }) => {
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

        <Add_Task_Form
          onSubmit={(task) => {
            onSubmit(task);
            setClosing(true);
          }}
        />
      </Modal_Content>
    </Modal_Overlay>
  );
};