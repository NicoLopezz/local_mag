import { FC } from "react";
import styled from "styled-components";
import { Task_Card } from "@/components/molecules/card_tasks/task_card";
import { New_Task_Card } from "@/components/molecules/card_tasks/New_Task_Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  tag: string;
}

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (taskName: string) => void;
  activeTaskId?: string;
  overTaskId?: string | null;
  isOver?: boolean;
}

export const Tasks_Column: FC<Props> = ({
  id,
  title,
  tasks,
  onAddTask,
  activeTaskId,
  overTaskId,
  isOver,
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
          items={[...tasks.map((t) => t.id), id]}
          strategy={verticalListSortingStrategy}
        >
          <Cards_Container>
            {cardsToRender.map((task) =>
              task.id === activeTaskId
                ? null
                : task.id === "__placeholder__"
                ? (
                  <Placeholder_Card key="placeholder" />
                ) : (
                  <Task_Card
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    tag={task.tag}
                  />
                )
            )}
          </Cards_Container>
        </SortableContext>
      </Scrollable>
      <New_Task_Card onAdd={onAddTask} />
    </Column>
  );
};

const Column = styled.div`
  flex-shrink: 0;
  background-color: #f4f5f7;
  border-radius: 12px;
  padding: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Column_Header = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--dark-blue);
  margin: 0 0 12px 0;
`;

const Scrollable = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
