import { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";
import { New_Task_Card } from "@/components/molecules/tasks/New_Task_Card";
import { useDrag } from "@/context/Drag_Context";
import type { Task } from "@/mock_data/tasks";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (taskName: string) => void;
  onOpenModal: () => void;
  onOpenTaskModal: (task: Task) => void;
  onMoveTask?: (taskId: string, direction: "next" | "last") => void;
  onDropTask: (task: Task, columnId: string, index: number) => void;
}

export const Tasks_Column: FC<Props> = ({
  id,
  title,
  tasks,
  onAddTask,
  onOpenModal,
  onOpenTaskModal,
  onMoveTask,
  onDropTask,
}) => {
  const { draggedTask, setDraggedTask, setDragPosition, dragPosition } = useDrag();
  const [isOver, setIsOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isOver || !dragPosition || !containerRef.current) {
      setHoverIndex(null);
      return;
    }

    const cards = Array.from(containerRef.current.children).filter(
      (el) => el.getAttribute("data-type") === "task"
    );

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;
      if (dragPosition.y < middleY) {
        setHoverIndex(i);
        return;
      }
    }

    setHoverIndex(cards.length);
  }, [dragPosition, isOver, tasks.length]);

  useEffect(() => {
    const handleMouseUp = () => {
      console.log("🟢 Drop detected:", {
        column: id,
        task: draggedTask?.id,
        dropIndex: hoverIndex ?? tasks.length,
      });      
      if (draggedTask && isOver) {
        const dropIndex = hoverIndex ?? tasks.length;
        onDropTask(draggedTask, id, dropIndex); 
        setDraggedTask(null);
        setDragPosition(null);
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [draggedTask, isOver, hoverIndex]);
  

  const renderTasks = () => {
    const items = [...tasks];
    if (draggedTask && isOver && hoverIndex !== null) {
      items.splice(hoverIndex, 0, { id: "__placeholder__", title: "" } as Task);
    }

    return items.map((task, index) =>
      task.id === "__placeholder__" ? (
        <Placeholder_Card key="placeholder" />
      ) : (
        <Task_Card
          key={task.id}
          id={task.id}
          title={task.title}
          tag={task.tag}
          priority={
            task.priority === "Baja" ||
            task.priority === "Media" ||
            task.priority === "Alta" ||
            task.priority === "Sin prioridad"
              ? task.priority
              : undefined
          }
          assigned={task.assigned}
          assignedImage="/images/empleados/persona.png"
          status={task.status}
          onOpenModal={() => onOpenTaskModal(task)}
          onMoveTask={onMoveTask}
          dueDate={task.dueDate}
          data-index={index}
          data-type="task"
        />
      )
    );
  };

  return (
    <Column
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <Column_Header>{title}</Column_Header>
      <Scrollable ref={containerRef}>{renderTasks()}</Scrollable>
      <New_Task_Card
        onAdd={(taskName) => onAddTask(taskName)}
        onOpenModal={onOpenModal}
      />
    </Column>
  );
};

const Placeholder_Card = styled.div`
  width: 100%;
  height: 72px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border: 2px dashed #b0c4ff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
`;

const Column = styled.div`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 12px;
  padding: 10px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Column_Header = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 700;
  margin: 0 0 12px 0;
`;

const Scrollable = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.icon};
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.button};
  }
`;


const Cards_Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80%;
`;

