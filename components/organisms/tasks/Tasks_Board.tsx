import { FC, useEffect, useState } from "react";
import styled from "styled-components";
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
import { Add_Task_Modal } from "@/components/organisms/add_modals/Add_Task_Modal";

interface Task {
  id: string;
  title: string;
  tag: string;
  priority: string;
  assigned: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Props {}

export const Tasks_Board: FC<Props> = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overTaskId, setOverTaskId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    setColumns([
      {
        id: "priorities",
        title: "Prioridades",
        tasks: [],
      },
      {
        id: "in_progress",
        title: "In Progress",
        tasks: [],
      },
      {
        id: "delivered",
        title: "Delivered",
        tasks: [],
      },
    ]);
  }, []);

  const handleAddQuickTask = (columnId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: crypto.randomUUID(),
                  title,
                  tag: "Sin etiqueta",
                  priority: "Baja",
                  assigned: "Sin asignar",
                },
              ],
            }
          : col
      )
    );
  };

  const handleOpenModal = (columnId: string) => {
    setTargetColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTargetColumnId(null);
  };

  const handleSubmitModal = (task: {
    title: string;
    description: string;
    priority?: string;
    dueDate?: string;
    assignee?: string;
    tags?: string;
  }) => {
    if (!targetColumnId) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === targetColumnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: crypto.randomUUID(),
                  title: task.title,
                  tag: task.tags || "Sin etiqueta",
                  priority: task.priority || "Sin prioridad",
                  assigned: task.assignee || "Sin asignar",
                },
              ],
            }
          : col
      )
    );

    setIsModalOpen(false);
    setTargetColumnId(null);
  };

  const handleAddColumn = (title: string) => {
    setColumns((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        tasks: [],
      },
    ]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
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

    if (overIsTask) {
      const overColumn = columns.find((col) =>
        col.tasks.some((t) => t.id === over.id)
      );
      if (!overColumn) return;

      if (activeColumn.id === overColumn.id) {
        const oldIndex = activeColumn.tasks.findIndex(
          (t) => t.id === active.id
        );
        const newIndex = overColumn.tasks.findIndex((t) => t.id === over.id);
        const reorderedTasks = [...activeColumn.tasks];
        const [task] = reorderedTasks.splice(oldIndex, 1);
        reorderedTasks.splice(newIndex, 0, task);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === activeColumn.id ? { ...col, tasks: reorderedTasks } : col
          )
        );
      } else {
        const newActiveTasks = activeColumn.tasks.filter(
          (t) => t.id !== active.id
        );
        const overIndex = overColumn.tasks.findIndex((t) => t.id === over.id);
        const newOverTasks = [...overColumn.tasks];
        newOverTasks.splice(overIndex, 0, movedTask);

        setColumns((prev) =>
          prev.map((col) => {
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
      const targetColumn = columns.find((col) => col.id === columnId);
      if (!targetColumn) return;

      const newActiveTasks = activeColumn.tasks.filter(
        (t) => t.id !== active.id
      );

      setColumns((prev) =>
        prev.map((col) => {
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
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Wrapper>
          <Board>
            {columns.map((column) => (
              <Tasks_Column
                key={column.id}
                id={`column-${column.id}`}
                title={column.title}
                tasks={column.tasks}
                onAddTask={(taskName) =>
                  handleAddQuickTask(column.id, taskName)
                }
                onOpenModal={() => handleOpenModal(column.id)}
                onOpenTaskModal={(task) => console.log("Open task modal for:", task)}
                activeTaskId={activeTask?.id}
                overTaskId={overTaskId}
                isOver={overColumnId === column.id}
              />
            ))}
            <New_Column_Card onAdd={handleAddColumn} />
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
            />
          )}
        </DragOverlay>
      </DndContext>

      {isModalOpen && (
        <Add_Task_Modal
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  max-width: 1500px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  height: 70vh;
  scrollbar-width: auto;
  -webkit-overflow-scrolling: touch;
`;

const Board = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: fit-content;
  align-items: flex-start;
`;
