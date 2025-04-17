import { FC, useState } from "react";
import styled from "styled-components";
import type { Task, Column } from "@/mock_data/tasks";
import { Tasks_Column } from "@/components/organisms/tasks/Tasks_Column";
import { New_Column_Card } from "@/components/molecules/tasks/New_Column_Card";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";



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
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overTaskId, setOverTaskId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor)
  );

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
                  dueDate: "23/08/25"
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

    newColumns[targetIndex].tasks = [
      ...newColumns[targetIndex].tasks,
      task,
    ];

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

  const handleDragStart = (event: DragStartEvent) => {
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      setOverTaskId(null);
      setOverColumnId(null);
      return;
    }

    const overId = over.id.toString();
    const columnWithOverTask = columns.find((col) =>
      col.tasks.some((task) => task.id === overId)
    );

    if (columnWithOverTask) {
      setOverTaskId(overId);
      setOverColumnId(columnWithOverTask.id);
    } else {
      const columnId = overId.replace("column-", "");
      const colExists = columns.find((col) => col.id === columnId);
      if (colExists) {
        setOverTaskId(null);
        setOverColumnId(colExists.id);
      } else {
        setOverTaskId(null);
        setOverColumnId(null);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTask(null);
      setOverTaskId(null);
      setOverColumnId(null);
      return;
    }

    const activeColumn = columns.find((col) =>
      col.tasks.some((t) => t.id === active.id)
    );
    const movedTask = activeColumn?.tasks.find((t) => t.id === active.id);
    if (!activeColumn || !movedTask) return;

    const overIsTask = columns.some((col) =>
      col.tasks.some((t) => t.id === over.id)
    );

    const newColumns = [...columns];

    if (overIsTask) {
      const overColumn = newColumns.find((col) =>
        col.tasks.some((t) => t.id === over.id)
      );
      if (!overColumn) return;

      if (activeColumn.id === overColumn.id) {
        const oldIndex = activeColumn.tasks.findIndex(
          (t) => t.id === active.id
        );
        const newIndex = overColumn.tasks.findIndex(
          (t) => t.id === over.id
        );
        const reorderedTasks = [...activeColumn.tasks];
        const [task] = reorderedTasks.splice(oldIndex, 1);
        reorderedTasks.splice(newIndex, 0, task);
        onColumnsChange(
          newColumns.map((col) =>
            col.id === activeColumn.id
              ? { ...col, tasks: reorderedTasks }
              : col
          )
        );
      } else {
        const newActiveTasks = activeColumn.tasks.filter(
          (t) => t.id !== active.id
        );
        const overIndex = overColumn.tasks.findIndex(
          (t) => t.id === over.id
        );
        const newOverTasks = [...overColumn.tasks];
        newOverTasks.splice(overIndex, 0, movedTask);

        onColumnsChange(
          newColumns.map((col) => {
            if (col.id === activeColumn.id)
              return { ...col, tasks: newActiveTasks };
            if (col.id === overColumn.id)
              return { ...col, tasks: newOverTasks };
            return col;
          })
        );
      }
    } else {
      const columnId = over.id.toString().replace("column-", "");
      const targetColumn = newColumns.find((col) => col.id === columnId);
      if (!targetColumn) return;

      const newActiveTasks = activeColumn.tasks.filter(
        (t) => t.id !== active.id
      );

      onColumnsChange(
        newColumns.map((col) => {
          if (col.id === activeColumn.id)
            return { ...col, tasks: newActiveTasks };
          if (col.id === targetColumn.id)
            return { ...col, tasks: [...col.tasks, movedTask] };
          return col;
        })
      );
    }

    setActiveTask(null);
    setOverTaskId(null);
    setOverColumnId(null);
  };

  return (
    // <DndContext
    //   sensors={sensors}
    //   collisionDetection={rectIntersection}
    //   onDragStart={handleDragStart}
    //   onDragOver={handleDragOver}
    //   onDragEnd={handleDragEnd}
    // >
    <>
    
      <Wrapper>
        <Board>
          {columns.map((column) => (
            <Tasks_Column
              key={column.id}
              id={`column-${column.id}`}
              title={column.title}
              tasks={column.tasks}
              onAddTask={(taskName) => handleAddQuickTask(column.id, taskName)}
              onMoveTask={handleMoveTask}
              onOpenModal={() => onOpenAddTaskModal(column.id)}
              onOpenTaskModal={onOpenTaskDetail}
              activeTaskId={activeTask?.id}
              overTaskId={overTaskId}
              isOver={overColumnId === column.id}
            />
          ))}
          {/* <New_Column_Card onAdd={handleAddColumn} /> */}
        </Board>
      </Wrapper>

      <DragOverlay>
        {activeTask && (
          <Task_Card
            id={activeTask.id}
            title={activeTask.title}
            tag={activeTask.tag}
            priority={activeTask.priority}
            assigned={activeTask.assigned}
            status={activeTask.status}
            
            
          />
        )}
      </DragOverlay>
      </>
    // </DndContext>
  );
};

const Wrapper = styled.div`
  /* max-width: 1500px; */
  /* background-color: red; */
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  height: 70vh;
  scrollbar-width: auto;
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
