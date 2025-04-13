import { FC } from "react";
import styled from "styled-components";

interface Props {
  isEditing: boolean;
  priority: string;
  status: string;
  endDate: Date;
  onPriorityChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onEndDateChange: (val: Date) => void;
  statusSteps: Record<string, number>;
}

export const Task_Metadata_EditDetail: FC<Props> = ({
  isEditing,
  priority,
  status,
  endDate,
  onPriorityChange,
  onStatusChange,
  onEndDateChange,
  statusSteps,
}) => {
  const today = new Date();
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <Row>
      <Section>
        <Label>Prioridad</Label>
        <Select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          disabled={!isEditing}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </Select>
      </Section>

      <Section>
        <Label>Estado</Label>
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={!isEditing}
        >
          <option value="">Seleccionar</option>
          {Object.keys(statusSteps).map((step) => (
            <option key={step} value={step}>
              {step}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        {isEditing ? (
          <>
            <Label>Nuevo fin</Label>
            <DateInput
              type="date"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => onEndDateChange(new Date(e.target.value))}
            />
          </>
        ) : (
          <Countdown>
            <Label>Fin de tarea</Label>
            <span>{endDate.toLocaleDateString()}</span>
            <Restan>Restan {daysRemaining} días</Restan>
          </Countdown>
        )}
      </Section>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 90%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 400;
  color: #444;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
`;

const DateInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: fit-content;
`;

const Countdown = styled.div`
  font-size: 16px;
  color: var(--dark-blue);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Restan = styled.span`
  font-size: 13px;
  font-style: italic;
  color: #444;
`;
