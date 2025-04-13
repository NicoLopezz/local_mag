import { FC } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  isEditing: boolean;
  tags: string;
  onChange: (val: string) => void;
}

export const Task_Tags_EditDetail: FC<Props> = ({ isEditing, tags, onChange }) => {
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      const currentTags = tags ? tags.split(",").map((t) => t.trim()) : [];
      if (value && !currentTags.includes(value)) {
        const updated = [...currentTags, value].join(",");
        onChange(updated);
      }
      e.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = tags
      .split(",")
      .filter((t) => t.trim() !== tagToRemove)
      .join(",");
    onChange(updated);
  };

  const tagArray = tags ? tags.split(",").map((t) => t.trim()) : [];

  return (
    <Section>
      <Row>
        <Label>Etiquetas</Label>
        <ChipContainer>
          {tagArray.map((tag, i) => (
            <Chip key={i}>
              {tag}
              {isEditing && <Remove onClick={() => handleRemoveTag(tag)}>×</Remove>}
            </Chip>
          ))}
        </ChipContainer>
      </Row>

      {isEditing && (
        <Input
          type="text"
          placeholder="Presioná Enter para agregar etiqueta"
          onKeyDown={handleAddTag}
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
  gap: 0.5rem;
  flex: 1;
`;

const Chip = styled.div`
  background: #000000a1;
  color: #fff;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 400;
  /* border-radius: 4px; */
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideInTag} 0.3s ease;
`;

const Remove = styled.span`
  cursor: pointer;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: 90%;
`;
