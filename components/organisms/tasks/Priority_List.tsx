import { FC } from "react";
import styled from "styled-components";
import { Priority_Item } from "@/components/molecules/tasks/Priority_Item";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Props {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export const Priority_List: FC<Props> = ({ tasks, setTasks, onSelect, selectedId }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <List>
          {tasks.map((task) => (
            <Priority_Item
              key={task.id}
              id={task.id}
              title={task.title}
              isSelected={task.id === selectedId}
              onClick={() => onSelect(task.id)}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
