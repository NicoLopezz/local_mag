import { FC } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Task_Tag } from "@/components/atoms/card_tasks/Task_Tag";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";

interface Props {
  id: string;
  title: string;
  tag: string;
}

export const Task_Card: FC<Props> = ({ id, title, tag }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <Card_Container
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <Drag_Indicator />
      <Task_Title title={title} />
      <Task_Tag tag={tag} />
    </Card_Container>
  );
};

const Card_Container = styled.div<{ $isDragging: boolean }>`
  width: 100%;
  min-height: 60px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: grab;
  touch-action: none;
  transition: transform 200ms ease, opacity 200ms ease, border 200ms ease;
  will-change: transform;
  border: ${({ $isDragging }) =>
    $isDragging ? "2px solid var(--strong-green)" : "1px solid transparent"};
`;