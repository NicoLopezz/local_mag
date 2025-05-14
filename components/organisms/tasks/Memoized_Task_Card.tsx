import { FC, memo } from "react";
import { Task_Card } from "@/components/molecules/tasks/Task_Card";
import { Task } from "./useColumns";

interface Props extends Task {}

export const Memoized_Task_Card: FC<Props> = memo(({ ...props }) => {
  return <Task_Card {...props} />;
});
