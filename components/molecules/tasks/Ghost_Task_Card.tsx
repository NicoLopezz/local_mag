import styled from "styled-components";
import { useDrag } from "@/context/Drag_Context";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";

export const Ghost_Task_Card = () => {
  const { draggedTask, dragPosition } = useDrag();

  if (!draggedTask || !dragPosition) return null;

  return (
    <GhostWrapper
      style={{
        transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
      }}
    >
      <Task_Card {...draggedTask} isDragging />
    </GhostWrapper>
  );
};

const GhostWrapper = styled.div`
  position: fixed;
  width: 280px;
  top: 0;
  left: 0;
  transform: translate(-10%, -10%);
  pointer-events: none;
  z-index: 10000;
  transition: transform 50ms linear;
  will-change: transform, top, left;
`;
