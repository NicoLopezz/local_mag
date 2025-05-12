// import { Column, Task } from "./useColumns";
// import { useState } from "react";
// export const useDragHandlers = (columns: Column[], setColumns: (columns: Column[]) => void) => {
//   const [activeTask, setActiveTask] = useState<Task | null>(null);
//   const [overTaskId, setOverTaskId] = useState<string | null>(null);
//   const [overColumnId, setOverColumnId] = useState<string | null>(null);

//   const handleDragStart = (event: DragStartEvent) => {
//     const task = columns.flatMap((col) => col.tasks).find((t) => t.id === event.active.id);
//     if (task) setActiveTask(task);
//   };

//   const handleDragOver = (event: DragOverEvent) => {
//     const { over } = event;
//     if (!over) {
//       setOverTaskId(null);
//       setOverColumnId(null);
//       return;
//     }

//     const overId = over.id.toString();
//     const column = columns.find((col) => col.tasks.some((t) => t.id === overId));
//     if (column) {
//       setOverTaskId(overId);
//       setOverColumnId(column.id);
//     } else {
//       const colId = overId.replace("column-", "");
//       const found = columns.find((col) => col.id === colId);
//       setOverColumnId(found?.id || null);
//       setOverTaskId(null);
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     // La lógica que ya tenés para mover tareas va acá.
//     setActiveTask(null);
//     setOverTaskId(null);
//     setOverColumnId(null);
//   };

//   return {
//     activeTask,
//     overTaskId,
//     overColumnId,
//     handleDragStart,
//     handleDragOver,
//     handleDragEnd,
//   };
// };
