import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  isEditing: boolean;
  assigned: string;
  onChange: (val: string) => void;
}

export const Task_Assigned_EditDetail: FC<Props> = ({ isEditing, assigned, onChange }) => {
  const { t } = useLang();
  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      onChange(e.currentTarget.value.trim());
      e.currentTarget.value = "";
    }
  };

  return (
    <Section>
      <Row>
      <Label>{t.tasks.modals.taskDescription.assigned}</Label>
      <ChipContainer>
          {assigned && (
            <Chip>
              {assigned}
              {isEditing && <Remove onClick={() => onChange("")}>×</Remove>}
            </Chip>
          )}
        </ChipContainer>
      </Row>

      {isEditing && (
        <Input
          type="text"
          placeholder="Presioná Enter para agregar nombre"
          onKeyDown={handleAdd}
        />
      )}
    </Section>
  );
};

const slideInTag = keyframes`
  0% {
    transform: translateY(8px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-weight: 400;
  color: #444;
  min-width: 80px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  flex: 1;
`;

const Chip = styled.div`
  background: #000000a1;
  color: #fff;
  padding: 2px 10px;
  font-size: 10px;
  font-weight: 400;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  white-space: nowrap;
  margin-right: -2px;
  animation: ${slideInTag} 0.3s ease;
`;

const Remove = styled.span`
  cursor: pointer;
  font-size: 14px;
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: 90%;
`;
