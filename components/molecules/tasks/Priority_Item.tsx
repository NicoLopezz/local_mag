import { FC } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Priority_Item: FC<Props> = ({ id, title, isSelected, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      isSelected={isSelected}
    >
      <Grab {...listeners} {...attributes}>
        <Dot /><Dot />
        <Dot /><Dot />
        <Dot /><Dot />
      </Grab>
      <Content onClick={onClick}>
        <Title>{title}</Title>
      </Content>
    </Card>
  );
};

const Card = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #cccccc6c;
  background-color: ${({ isSelected }) => (isSelected ? "#f0f0f0" : "#fff")};
  border-radius: 8px;
  cursor: pointer;
`;

const Grab = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 4px);
  grid-template-rows: repeat(3, 4px);
  gap: 4px;
  margin-right: 12px;
  cursor: grab;
  user-select: none;
  width: 16px;
  height: 24px;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: black;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Title = styled.div`
  font-weight: 600;
`;
