import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "@/context/Drag_Context";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";

export const Drag_Overlay: FC = () => {
  const { draggedTask, dragPosition } = useDrag();

  if (!draggedTask || !dragPosition) return null;

  return (
    <Overlay style={{ left: dragPosition.x, top: dragPosition.y }}>
      <Task_Card {...draggedTask} />
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
