import { FC, useState } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Task_Tag } from "@/components/atoms/card_tasks/Task_Tag";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";
import { Task_Priority_Tag } from "@/components/atoms/card_tasks/Task_Priority_Tag";
import { Task_Assigned } from "@/components/atoms/card_tasks/Task_Assigned";
import { Task_Progress_Mini } from "@/components/atoms/card_tasks/Task_Progress_Mini";
import { motion } from "framer-motion";
import { ChevronRight, ChevronsRight } from "lucide-react";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  tag?: string;
  priority?: string;
  assigned?: string;
  assignedImage?: string;
  status?: string;
  onOpenModal?: () => void;
  onMoveTask?: (taskId: string, direction: "next" | "last") => void;
}

export const Task_Card: FC<Props> = ({
  id,
  title,
  tag = "-",
  priority = "Sin prioridad",
  assigned = "Sin asignar",
  assignedImage = "/images/empleados/persona.png",
  status,
  onOpenModal,
  onMoveTask,
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

  const handleMoveNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveTask?.(id, "next");
  };

  const handleMoveLast = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveTask?.(id, "last");
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
      <Top_Row>
        <Task_Priority_Tag priority={priority} />
        <Icons_Wrapper>
          <Icon_Box onClick={handleMoveNext}>
            <ChevronRight size={14} />
          </Icon_Box>
          <Icon_Box onClick={handleMoveLast}>
            <ChevronsRight size={14} />
          </Icon_Box>
        </Icons_Wrapper>
      </Top_Row>

      <Content_Area>
        <Drag_Indicator />
        <Task_Title title={title} />
        <Tags_Container>
          {tag.split(",").map((t, idx) => (
            <Styled_Tag key={idx}>{t.trim()}</Styled_Tag>
          ))}
        </Tags_Container>
      </Content_Area>

      <Assigned_Area>
        <Profile_Image
          src={assignedImage}
          width={20}
          height={20}
          alt="profile"
        />
        <Task_Assigned name={assigned} />
      </Assigned_Area>

      <Progress_Mini_Wrapper>
        <Task_Progress_Mini status={status as any} />
        {/* console.log("status en Task_Card!!!!:", status); */}
      </Progress_Mini_Wrapper>
    </Card_Container>
  );
};

const Tags_Container = styled.div`
  display: flex;
  margin-top: 4px;
  margin-left: -0.3rem;
`;

const Styled_Tag = styled.div`
  background: #000000a1;
  color: #fff;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 400;
  border-radius: 4px;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  white-space: nowrap;
  margin-right: -2px;
`;


const Card_Container = styled.div<{ $isDragging: boolean }>`
  position: relative;
  width: 100%;
  min-height: 110px;
  height: 7rem;
  background-color: #ffffff;
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

const Top_Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icons_Wrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const Icon_Box = styled.div`
  background-color: #b6b5b53f;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Content_Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: -0.5rem;
  margin-left: -0.3rem;
`;

const Assigned_Area = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  margin-left: auto;
`;

const Profile_Image = styled(Image)`
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const Progress_Mini_Wrapper = styled.div`
  position: absolute;
  bottom: -5px;
  left: 5px;
  width: 80px;
`;
