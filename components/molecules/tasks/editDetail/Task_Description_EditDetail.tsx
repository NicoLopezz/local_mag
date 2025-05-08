import { FC } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";



interface Props {
  description: string;
  isEditing: boolean;
  onChange: (val: string) => void;
}

export const Task_Description_EditDetail: FC<Props> = ({ description, isEditing, onChange }) => {
  const { t } = useLang();

  return (
    <Section>
      <Label>{t.tasks.modals.taskDescription.title}</Label>
      <TextArea
        value={description}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing}
      />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 400;
  color: #444;
`;

const TextArea = styled.textarea`
  resize: none;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-family: inherit;
  font-style: italic;
  color: #807c7c;
`;
