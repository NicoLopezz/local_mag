import { FC, memo } from "react";
import { Tasks_Column } from "@/components/organisms/tasks/Tasks_Column";
import { Task } from "./useColumns";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (taskName: string) => void;
  onMoveTask: (taskId: string, direction: "next" | "last") => void;
  onOpenModal: () => void;
  onOpenTaskModal: (task: Task) => void;
  activeTaskId?: string;
  overTaskId?: string | null;
  isOver?: boolean;
}

export const Memoized_Column: FC<Props> = memo((props) => {
  return <Tasks_Column {...props} />;
});
