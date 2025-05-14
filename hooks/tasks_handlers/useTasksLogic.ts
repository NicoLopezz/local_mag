import { useState, useMemo } from "react";
import { initialTasks } from "@/mock_data/tasks";
import { Column, Task } from "@/mock_data/tasks";

export const useTasksLogic = () => {
  const [originalColumns, setOriginalColumns] = useState<Column[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const columns = useMemo(() => {
    if (selectedUsers.length === 0) return originalColumns;
    
    return originalColumns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => 
        task.assigned && selectedUsers.includes(task.assigned)
      )
    }));
  }, [originalColumns, selectedUsers]);

  const openAddTaskModal = () => setIsModalOpen(true);
  const closeDetailModal = () => setShowDetailModal(false);

  const submitNewTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId = { ...newTask, id: crypto.randomUUID() };
    setOriginalColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === "priorities"
          ? { ...column, tasks: [...column.tasks, taskWithId] }
          : column
      )
    );
    setIsModalOpen(false);
  };

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const saveTaskChanges = (updatedTask: Task) => {
    setOriginalColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === updatedTask.id ? {
            ...task,
            ...updatedTask,
            dueDate: updatedTask.endDate 
              ? updatedTask.endDate.toISOString() 
              : updatedTask.dueDate
          } : task
        )
      }))
    );
    setShowDetailModal(false);
  };

  const updateStatus = (taskId: string, newStatus: string) => {
    setOriginalColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      }))
    );
  };

  return {
    columns,
    setColumns: setOriginalColumns,
    selectedTask,
    isModalOpen,
    showDetailModal,
    openAddTaskModal,
    submitNewTask,
    openDetailModal,
    closeDetailModal,
    saveTaskChanges,
    updateStatus,
    setSelectedUsers,
  };
};