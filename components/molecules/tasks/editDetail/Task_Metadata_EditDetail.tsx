import { FC } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

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
  const { t } = useLang();

  return (
    <Row>
      <Section>
        <Label>{t.tasks.modals.taskDescription.priority}</Label>
        <Select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          disabled={!isEditing}
        >
          <option value="Alta">{t.tasks.priorityLabels.Alta}</option>
          <option value="Media">{t.tasks.priorityLabels.Media}</option>
          <option value="Baja">{t.tasks.priorityLabels.Baja}</option>
        </Select>
      </Section>

      <Section>
        <Label>{t.tasks.modals.taskDescription.status}</Label>
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={!isEditing}
        >
          <option value="">{t.tasks.modals.taskDescription.select}</option>
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
            <Label>{t.tasks.modals.taskDescription.newEnd}</Label>
            <DateInput
              type="date"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => onEndDateChange(new Date(e.target.value))}
            />
          </>
        ) : (
          <Countdown>
            <Label>{t.tasks.modals.taskDescription.taskEnd}</Label>
            <span>{endDate.toLocaleDateString()}</span>
            <Restan>
              {t.tasks.modals.taskDescription.remaining.replace(
                "{{count}}",
                String(daysRemaining)
              )}
            </Restan>
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
