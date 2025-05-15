import { FC } from "react";
import styled from "styled-components";
import type { Task, Column } from "@/mock_data/tasks";
import { Tasks_Column } from "@/components/organisms/tasks/Tasks_Column";
import { New_Column_Card } from "@/components/molecules/tasks/New_Column_Card";
// import { Drag_Overlay } from "@/components/molecules/tasks/Drag_Overlay";
import { Ghost_Task_Card } from "@/components/molecules/tasks/Ghost_Task_Card";

interface Props {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
  onOpenAddTaskModal: (columnId: string) => void;
  onOpenTaskDetail: (task: Task) => void;
}

export const Tasks_Board: FC<Props> = ({
  columns,
  onColumnsChange,
  onOpenAddTaskModal,
  onOpenTaskDetail,
}) => {
  const handleAddQuickTask = (columnId: string, title: string) => {
    onColumnsChange(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: crypto.randomUUID(),
                  title,
                  tag: "",
                  priority: "Baja",
                  assigned: "Sin asignar",
                  description: "Descripción generada automáticamente",
                  status: "Paso 1",
                  dueDate: "23/08/25",
                },
              ],
            }
          : col
      )
    );
  };

  

  const handleMoveTask = (taskId: string, direction: "next" | "last") => {
    const currentColumnIndex = columns.findIndex((col) =>
      col.tasks.some((t) => t.id === taskId)
    );
    if (currentColumnIndex === -1) return;

    const currentColumn = columns[currentColumnIndex];
    const task = currentColumn.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newColumns = [...columns];
    newColumns[currentColumnIndex].tasks = currentColumn.tasks.filter(
      (t) => t.id !== taskId
    );

    const targetIndex =
      direction === "next"
        ? Math.min(currentColumnIndex + 1, newColumns.length - 1)
        : newColumns.length - 1;

    newColumns[targetIndex].tasks = [...newColumns[targetIndex].tasks, task];

    onColumnsChange(newColumns);
  };

  const handleDropTask = (
    task: Task,
    targetColumnId: string,
    index: number
  ) => {
    const newColumns = [...columns];
  
    const sourceColumnIndex = newColumns.findIndex((col) =>
      col.tasks.some((t) => t.id === task.id)
    );
    const targetColumnIndex = newColumns.findIndex(
      (col) => col.id === targetColumnId
    );
    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;
  
    const sourceTasks = [...newColumns[sourceColumnIndex].tasks];
    const targetTasks = [...newColumns[targetColumnIndex].tasks];
  
    const taskIndex = sourceTasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) return;
    if (
      sourceColumnIndex === targetColumnIndex &&
      taskIndex === index
    ) return;
    sourceTasks.splice(taskIndex, 1);  
    const existingInTarget = targetTasks.findIndex((t) => t.id === task.id);
    if (existingInTarget !== -1) {
      targetTasks.splice(existingInTarget, 1);
    }
    targetTasks.splice(index, 0, task);
    newColumns[sourceColumnIndex].tasks = sourceTasks;
    newColumns[targetColumnIndex].tasks = targetTasks;
    onColumnsChange(newColumns);
  };
  
  

  const handleAddColumn = (title: string) => {
    onColumnsChange([
      ...columns,
      {
        id: crypto.randomUUID(),
        title,
        tasks: [],
      },
    ]);
  };

  return (
    <>
      <Wrapper>
        <Board>
          {columns.map((column) => (
            <Tasks_Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onAddTask={(taskName) => handleAddQuickTask(column.id, taskName)}
              onMoveTask={handleMoveTask}
              onOpenModal={() => onOpenAddTaskModal(column.id)}
              onOpenTaskModal={onOpenTaskDetail}
              onDropTask={handleDropTask}
            />
          ))}
          {/* <New_Column_Card onAdd={handleAddColumn} /> */}
        </Board>
      </Wrapper>

      <Ghost_Task_Card />
    </>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

const Board = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: fit-content;
  align-items: flex-start;
  
`;
