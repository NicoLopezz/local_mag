import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";
import { Task_Priority_Tag } from "@/components/atoms/card_tasks/Task_Priority_Tag";
import { Task_Progress_Mini } from "@/components/atoms/card_tasks/Task_Progress_Mini";
import Image from "next/image";
import { useLang } from "@/context/Language_Context";

interface Props {
  id: string;
  title: string;
  tag?: string;
  priority?: "Baja" | "Media" | "Alta" | "Sin prioridad";
  assigned?: string;
  assignedImage?: string;
  status?: string;
  dueDate?: string;
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
  dueDate,
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

  const { t } = useLang();

  const getDaysLeft = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const end = new Date(dueDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0
      ? t.tasks.daysLeft.replace("{{count}}", String(diffDays))
      : t.tasks.overdue;
  };

  const daysLeftText = getDaysLeft(dueDate);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card_Container
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      $isDragging={isDragging}
      $mounted={mounted}
      onClick={onOpenModal}
    >
      <Top_Row>
        <Task_Priority_Tag priority={priority} />
        <Icons_Wrapper>
          <Icon_Box onClick={handleMoveNext}>
            <SvgIcon viewBox="0 0 24 24">
              <path
                d="M10 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </SvgIcon>
          </Icon_Box>
          <Icon_Box onClick={handleMoveLast}>
            <SvgIcon viewBox="0 0 24 24">
              <path
                d="M6 6l6 6-6 6M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </SvgIcon>
          </Icon_Box>
        </Icons_Wrapper>
      </Top_Row>

      <Content_Area>
        <Drag_Indicator />
        <Task_Title title={title} />
        <Tags_Container>
          {tag
            .split(",")
            .slice(0, 3)
            .map((t, idx) => (
              <Styled_Tag key={idx}>{t.trim()}</Styled_Tag>
            ))}
          {tag.split(",").length > 3 && <Styled_Tag>...</Styled_Tag>}
        </Tags_Container>
      </Content_Area>

      <Bottom_Row>
        <Progress_Mini_Wrapper>
          <Task_Progress_Mini status={status as any} />
        </Progress_Mini_Wrapper>
        <Right_Block>
          <Days_Left>{daysLeftText}</Days_Left>
          <AvatarWrapper>
            <Profile_Image
              src={assignedImage}
              width={25}
              height={25}
              alt="profile"
            />
          </AvatarWrapper>
        </Right_Block>
      </Bottom_Row>
    </Card_Container>
  );
};


const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Card_Container = styled.div<{ $isDragging: boolean; $mounted: boolean }>`
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
  animation: ${({ $mounted }) => ($mounted ? appear : "none")} 0.3s ease;
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

const SvgIcon = styled.svg`
  width: 12px;
  height: 12px;
`;

const Content_Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: -0.5rem;
  margin-left: -0.3rem;
`;

const Tags_Container = styled.div`
  display: flex;
  margin-top: 4px;
  margin-left: -0.3rem;
`;

const Styled_Tag = styled.div`
  background: #000000a1;
  color: #fff;
  padding: 2px 12px;
  font-size: 10px;
  font-weight: 400;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  white-space: nowrap;
  margin-right: -2px;
`;

const Bottom_Row = styled.div`
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  align-items: flex-end;
`;

const Progress_Mini_Wrapper = styled.div`
  width: 80px;
`;

const Right_Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
`;

const Days_Left = styled.div`
  font-size: 10px;
  color: #333;
  font-style: italic;
  margin-bottom: 10px;
  margin-right: 10px
`;


const AvatarWrapper = styled.div`
  width: 30px;
  height: 30px;
  background: #f3f3f3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile_Image = styled(Image)`
  border-radius: 50%;
  background-color: #f0f0f0;
`;
