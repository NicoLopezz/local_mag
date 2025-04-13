import { FC, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Modal_Overlay } from "../../atoms/modal/Modal_Overlay";
import { Modal_Content_Base } from "../../atoms/modal/Modal_Content_Base";
import { Close_Button } from "../../atoms/modal/Close_Button";
import { Modal_Tab_Navigation } from "../../atoms/modal/Modal_Tab_Navigation";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClose: () => void;
  children: ReactNode;
  imageSlot?: ReactNode;
}

export const Base_Details_Modal: FC<Props> = ({
  tabs,
  activeTab,
  onTabChange,
  onClose,
  children,
  imageSlot,
}) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setClosing(true);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return createPortal(
    <Modal_Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) setClosing(true);
      }}
      className={closing ? "closing" : ""}
      onAnimationEnd={() => closing && onClose()}
    >
      <Modal_Content_Base>
        <Close_Button onClick={() => setClosing(true)}>×</Close_Button>
        <Modal_Tab_Navigation tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

        <Modal_Grid>
          <Image_Box>{imageSlot}</Image_Box>
          <Content_Box>{children}</Content_Box>
        </Modal_Grid>
      </Modal_Content_Base>
    </Modal_Overlay>,
    document.body
  );
};

const Modal_Grid = styled.div`
  display: flex;
  height: 100%;
  gap: 2rem;
  margin-top: 1rem;
`;

const Image_Box = styled.div`
  flex: 1;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const Content_Box = styled.div`
  flex: 2;
  height: 100%;
`;
