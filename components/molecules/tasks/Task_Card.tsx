import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Task_Title } from "@/components/atoms/card_tasks/Task_Title";
import { Drag_Indicator } from "@/components/atoms/card_tasks/Drag_Indicator";
import { Task_Priority_Tag } from "@/components/atoms/card_tasks/Task_Priority_Tag";
import { Task_Progress_Mini } from "@/components/atoms/card_tasks/Task_Progress_Mini";
import Image from "next/image";
import { useLang } from "@/context/Language_Context";
import { useDrag } from "@/context/Drag_Context";
import { Priority } from "@/mock_data/tasks";

interface Props {
  id: string;
  title: string;
  tag?: string;
  priority?: Priority;
  assigned?: string;
  assignedImage?: string;
  status?: string;
  dueDate?: string;
  onOpenModal?: () => void;
  onMoveTask?: (taskId: string, direction: "next" | "last") => void;
  isDragging?: boolean;
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
  
  isDragging = false,
}) => {
  const { setDraggedTask, setDragPosition } = useDrag();
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

  const handleMoveNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveTask?.(id, "next");
  };

  const handleMoveLast = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveTask?.(id, "last");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();

    const taskData = {
      id,
      title,
      tag,
      priority,
      assigned,
      assignedImage,
      status,
      dueDate,
    };

    let moved = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!moved) {
        moved = true;
        setDraggedTask(taskData);
      }

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setDragPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const onMouseUp = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      if (!moved) {
        onOpenModal?.();
      }

      setTimeout(() => {
        setDragPosition(null);
        setDraggedTask(null);
      }, 0);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card_Container
      onClick={(e) => {
        e.stopPropagation(); // Detenemos la propagación para abrir el modal solo cuando se hace click en la tarjeta
        // onOpenModal();
      }}
      onMouseDown={handleMouseDown}
      data-type="task"
      $mounted={mounted}
      $isDragging={isDragging}
    >
      <Top_Row>
        <Task_Priority_Tag priority={priority} />
        <Icons_Wrapper>
          <Icon_Box
            onClick={(e) => {
              e.stopPropagation(); // Evita que el click en el ícono abra el modal
              handleMoveNext(e);
            }}
          >
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

          <Icon_Box
            onClick={(e) => {
              e.stopPropagation(); // Evita que el click en el ícono abra el modal
              handleMoveLast(e);
            }}
          >
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
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Card_Container = styled.div<{ $isDragging: boolean; $mounted: boolean }>`
  position: relative;
  width: 80%;
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
  opacity: ${({ $isDragging }) => ($isDragging ? 0.95 : 1)};
  transform: ${({ $isDragging }) => ($isDragging ? "scale(0.90)" : "scale(1)")};
  transition: transform 180ms ease-in-out, opacity 120ms ease-in-out,
    border 150ms ease;
  will-change: transform, opacity;
  border: ${({ $isDragging }) =>
    $isDragging ? "2px solid black" : "1px solid transparent"};
  animation: ${({ $mounted }) => ($mounted ? appear : "none")} 0.1s ease;
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
  transition: background-color 150ms ease, transform 150ms ease;

  &:hover {
    background-color: #d1d5db;
    transform: scale(1.1);
  }
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
  margin-right: 10px;
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
