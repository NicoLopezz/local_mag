import { FC } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  priority: "Baja" | "Media" | "Alta" | "Sin prioridad";
}

export const Task_Priority_Tag: FC<Props> = ({ priority }) => {
  const { t } = useLang();
  const translated = t.tasks.priorityLabels[priority] || priority;

  return <Title>{translated}</Title>;
};

const Title = styled.h3`
  font-weight: 100;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  margin: 0;
  color: var(--dark-blue);
`;
