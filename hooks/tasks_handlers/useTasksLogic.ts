import { useState } from "react";
import type { Column, Task } from "@/mock_data/tasks";
import { initialTasks } from "@/mock_data/tasks";

export const useTasksLogic = () => {
  const [columns, setColumns] = useState<Column[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);

  const openAddTaskModal = (colId: string) => {
    setTargetColumnId(colId);
    setIsModalOpen(true);
  };

  const submitNewTask = (task: {
    title: string;
    description?: string;
    priority?: string;
    dueDate?: string;
    assignee?: string;
    tags?: string;
  }) => {
    if (!targetColumnId) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      tag: task.tags || "",
      priority: task.priority || "Sin prioridad",
      assigned: task.assignee || "Sin asignar",
      description: task.description || "Sin descripción",
      status: "Paso 1",
      dueDate: task.dueDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === targetColumnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
    setIsModalOpen(false);
    setTargetColumnId(null);
  };

  const saveTaskChanges = (updatedTask: Partial<Task> & { title: string }) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === selectedTask?.id ? { ...task, ...updatedTask } : task
        )
      }))
    );
    setSelectedTask((prev) => (prev ? { ...prev, ...updatedTask } : prev));
  };

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedTask(null);
    setShowDetailModal(false);
  };

  const updateStatus = (newStatus: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === selectedTask?.id ? { ...t, status: newStatus } : t
        )
      }))
    );
    setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  return {
    columns,
    setColumns,
    selectedTask,
    isModalOpen,
    showDetailModal,
    openAddTaskModal,
    submitNewTask,
    openDetailModal,
    closeDetailModal,
    saveTaskChanges,
    updateStatus
  };
};
