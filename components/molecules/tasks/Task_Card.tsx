import { FC } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Task_Tag } from "@/components/atoms/card_tasks/Task_Tag";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";
import { Task_Priority_Tag } from "@/components/atoms/card_tasks/Task_Priority_Tag";
import { Task_Assigned } from "@/components/atoms/card_tasks/Task_Assigned";
import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  tag: string;
  priority: string;
  assigned: string;
  onOpenModal?: () => void;

}

export const Task_Card: FC<Props> = ({
  id,
  title,
  tag,
  priority,
  assigned,
}) => {
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
      as={motion.div}
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Absolute_Top_Right>
        <Task_Priority_Tag priority={priority} />
      </Absolute_Top_Right>
      <Absolute_Bottom_Right>
        <Task_Assigned name={assigned} />
      </Absolute_Bottom_Right>
      <Drag_Indicator />
      <Task_Title title={title} />
      <Task_Tag tag={tag} />
    </Card_Container>
  );
};

const Card_Container = styled.div<{ $isDragging: boolean }>`
  position: relative;
  width: 90%;
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

const Absolute_Top_Right = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Absolute_Bottom_Right = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;
