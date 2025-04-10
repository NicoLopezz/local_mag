import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Modal_Content } from "../../atoms/modal/Modal_Content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Task_Detail_Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Modal_Overlay onClick={onClose}>
      <Modal_Content onClick={(e) => e.stopPropagation()}>
        {children}
      </Modal_Content>
    </Modal_Overlay>
  );
};

