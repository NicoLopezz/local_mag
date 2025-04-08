import { FC } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, InfoIcon, CheckCircleIcon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  tag?: string;
  createdAt?: string;
  dueDate?: string;
  status?: "todo" | "in_progress" | "done";
}

interface Props {
  task: Task;
}

export const Priority_Details: FC<Props> = ({ task }) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>{task.title}</Title>
        {task.status && <Status $status={task.status}>{task.status}</Status>}
      </Header>

      <Section>
        <Label>
          <InfoIcon size={16} />
          Descripción
        </Label>
        <Value>{task.description || "Sin descripción."}</Value>
      </Section>

      <Section>
        <Label>
          <CalendarIcon size={16} />
          Fechas
        </Label>
        <Dates>
          <span>Creada: {task.createdAt || "—"}</span>
          <span>Vence: {task.dueDate || "—"}</span>
        </Dates>
      </Section>

      {task.tag && (
        <Section>
          <Label>Categoría</Label>
          <Tag>{task.tag}</Tag>
        </Section>
      )}
    </MotionCard>
  );
};

const MotionCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e4e7;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dark-blue);
`;

const Status = styled.div<{ $status: string }>`
  font-size: 0.875rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background-color: ${({ $status }) =>
    $status === "done"
      ? "#d1fae5"
      : $status === "in_progress"
      ? "#fef9c3"
      : "#e5e7eb"};
  color: ${({ $status }) =>
    $status === "done"
      ? "#065f46"
      : $status === "in_progress"
      ? "#92400e"
      : "#374151"};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Value = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
`;

const Dates = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Tag = styled.div`
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.875rem;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-weight: 500;
`;
