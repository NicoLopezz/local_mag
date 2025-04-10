import { FC, useState } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Task_Tag } from "@/components/atoms/card_tasks/Task_Tag";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";
import { Task_Priority_Tag } from "@/components/atoms/card_tasks/Task_Priority_Tag";
import { Task_Assigned } from "@/components/atoms/card_tasks/Task_Assigned";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  id: string;
  title: string;
  tag?: string;
  priority?: string;
  assigned?: string;
  onOpenModal?: () => void;
}

export const Task_Card: FC<Props> = ({
  id,
  title,
  tag = "Sin etiqueta",
  priority = "Sin prioridad",
  assigned = "Sin asignar",
  onOpenModal,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isChecked, setIsChecked] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
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
      onClick={onOpenModal}
    >
      <Circle_Toggle
        onClick={handleToggle}
        $checked={isChecked}
        as={motion.div}
        animate={{ scale: isChecked ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        {isChecked && <Check size={12} color="#fff" />}
      </Circle_Toggle>

      <Absolute_Top_Right>
        <Task_Priority_Tag priority={priority} />
      </Absolute_Top_Right>

      <Content_Area>
        <Drag_Indicator />
        <Task_Title title={title} />
        <Task_Tag tag={tag} />
      </Content_Area>

      <Absolute_Bottom_Right>
        <Task_Assigned name={assigned} />
      </Absolute_Bottom_Right>
    </Card_Container>
  );
};

const Card_Container = styled.div<{ $isDragging: boolean }>`
  position: relative;
  width: 100%;
  min-height: 72px;
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 14px 16px 10px 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: grab;
  touch-action: none;
  transition: transform 200ms ease, opacity 200ms ease, border 200ms ease;
  will-change: transform;
  border: ${({ $isDragging }) =>
    $isDragging ? "2px solid var(--strong-green)" : "1px solid transparent"};
`;

const Circle_Toggle = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #4444448a;
  background-color: ${({ $checked }) => ($checked ? "#000000a6" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Absolute_Top_Right = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Absolute_Bottom_Right = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Content_Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 0.5rem;
  margin-left: -0.3rem;
`;
