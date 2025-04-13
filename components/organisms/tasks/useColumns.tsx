import { useState } from "react";

export interface Task {
  id: string;
  title: string;
  tag?: string;
  priority?: string;
  assigned?: string;
  description?: string;
  status?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([
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
      title: "Done",
      tasks: [],
    },
  ]);

  return { columns, setColumns };
};
