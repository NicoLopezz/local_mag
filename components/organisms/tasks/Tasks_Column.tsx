import { FC } from "react";
import styled from "styled-components";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";
import { New_Task_Card } from "@/components/molecules/tasks/New_Task_Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Task } from "@/mock_data/tasks";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (taskName: string) => void;
  activeTaskId?: string;
  overTaskId?: string | null;
  isOver?: boolean;
  onOpenModal: () => void;
  onOpenTaskModal: (task: Task) => void;
  onMoveTask?: (taskId: string, direction: "next" | "last") => void;
}

export const Tasks_Column: FC<Props> = ({
  id,
  title,
  tasks,
  onAddTask,
  activeTaskId,
  overTaskId,
  isOver,
  onOpenModal,
  onOpenTaskModal,
  onMoveTask,
}) => {
  const { setNodeRef } = useDroppable({ id });

  const getCardsWithPlaceholder = () => {
    const items = [...tasks];

    if (isOver && activeTaskId) {
      const index = overTaskId
        ? items.findIndex((t) => t.id === overTaskId)
        : items.length;

      items.splice(index, 0, {
        id: "__placeholder__",
        title: "",
        tag: "",
        priority: "",
        assigned: "",
        dueDate: new Date().toISOString(),
      });
    }

    return items;
  };

  const cardsToRender = getCardsWithPlaceholder();

  return (
    <Column ref={setNodeRef}>
      <Column_Header>{title}</Column_Header>
      <Scrollable>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Cards_Container>
            {cardsToRender.map((task) =>
              task.id === activeTaskId ? null : task.id === "__placeholder__" ? (
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
                />
              )
            )}
          </Cards_Container>
        </SortableContext>
      </Scrollable>
      <New_Task_Card
        onAdd={(taskName) => onAddTask(taskName)}
        onOpenModal={onOpenModal}
      />
    </Column>
  );
};

const Column = styled.div`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 12px;
  padding: 10px;
  width: 45%;
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

const Placeholder_Card = styled.div`
  width: 100%;
  height: 72px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border: 2px dashed #b0c4ff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
`;
