import { FC } from "react";
import styled from "styled-components";

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
    <Card>
      <Header>
        <Title>{task.title}</Title>
        {task.status && <Status $status={task.status}>{task.status}</Status>}
      </Header>

      <Section>
        <Label>
          <InfoIcon />
          Descripción
        </Label>
        <Value>{task.description || "Sin descripción."}</Value>
      </Section>

      <Section>
        <Label>
          <CalendarIcon />
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
    </Card>
  );
};

const InfoIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e4e7;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  animation: fadeInUp 0.3s ease forwards;
  opacity: 0;
  transform: translateY(8px);

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

  svg {
    stroke: #6b7280;
  }
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
