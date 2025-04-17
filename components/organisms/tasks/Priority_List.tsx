import { FC, useState, useRef } from "react";
import styled from "styled-components";
import { Priority_Item } from "@/components/molecules/tasks/Priority_Item";

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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [direction, setDirection] = useState<"above" | "below" | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragEnter = (id: string, e: React.DragEvent) => {
    if (!draggedId || draggedId === id) return;
    
    const hoverElement = itemsRef.current.find(el => el.id === id);
    if (!hoverElement) return;
    
    const hoverRect = hoverElement.getBoundingClientRect();
    const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
    const hoverClientY = e.clientY - hoverRect.top;
    
    setHoverId(id);
    setDirection(hoverClientY < hoverMiddleY ? "above" : "below");
  };

  const handleDragEnd = () => {
    if (draggedId && hoverId && draggedId !== hoverId) {
      const oldIndex = tasks.findIndex(t => t.id === draggedId);
      let newIndex = tasks.findIndex(t => t.id === hoverId);
      
      // Ajustar la posición según la dirección
      if (direction === "below") newIndex += 1;
      
      const newTasks = [...tasks];
      const [removed] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, removed);
      
      setTasks(newTasks);
    }
    
    setDraggedId(null);
    setHoverId(null);
    setDirection(null);
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          id={task.id}
          ref={(el) => {
            if (el) {
              itemsRef.current[index] = el;
            }
          }}
        >
          <Priority_Item
            id={task.id}
            title={task.title}
            isSelected={task.id === selectedId}
            onClick={() => onSelect(task.id)}
            isDragging={task.id === draggedId}
            isHovered={task.id === hoverId}
            hoverDirection={task.id === hoverId ? direction : null}
            onDragStart={() => handleDragStart(task.id)}
            onDragEnter={(e) => handleDragEnter(task.id, e)}
            onDragEnd={handleDragEnd}
          />
        </div>
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;