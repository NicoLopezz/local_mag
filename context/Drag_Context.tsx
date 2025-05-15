import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

interface DragContextProps {
  draggedTask: any | null;
  setDraggedTask: (task: any | null) => void;
  dragPosition: { x: number; y: number } | null;
  setDragPosition: (pos: { x: number; y: number } | null) => void;
}

const DragContext = createContext<DragContextProps>({
  draggedTask: null,
  setDraggedTask: () => {},
  dragPosition: null,
  setDragPosition: () => {},
});


export const DragProvider = ({ children }: { children: ReactNode }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    document.body.style.userSelect = draggedTask ? "none" : "";
  }, [draggedTask]);

  return (
    <DragContext.Provider value={{ draggedTask, setDraggedTask, dragPosition, setDragPosition }}>
      {children}
    </DragContext.Provider>
  );
};


export const useDrag = () => useContext(DragContext);
