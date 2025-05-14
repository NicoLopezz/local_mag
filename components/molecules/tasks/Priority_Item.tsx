import { FC } from "react";
import styled, { css } from "styled-components";

interface Props {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  isDragging?: boolean;
  isHovered?: boolean;
  hoverDirection?: "above" | "below" | null;
  onDragStart: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export const Priority_Item: FC<Props> = ({ 
  id, 
  title, 
  isSelected, 
  onClick,
  isDragging = false,
  isHovered = false,
  hoverDirection = null,
  onDragStart,
  onDragEnter,
  onDragEnd
}) => {
  return (
    <Container
      draggable
      isSelected={isSelected}
      isDragging={isDragging}
      isHovered={isHovered}
      hoverDirection={hoverDirection}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <Grab>
        <Dot /><Dot />
        <Dot /><Dot />
        <Dot /><Dot />
      </Grab>
      <Content onClick={onClick}>
        <Title>{title}</Title>
      </Content>
    </Container>
  );
};

const Container = styled.div<{
  isSelected: boolean;
  isDragging: boolean;
  isHovered: boolean;
  hoverDirection: "above" | "below" | null;
}>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #cccccc6c;
  background-color: ${({ isSelected }) => (isSelected ? "#f0f0f0" : "#fff")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  ${({ isDragging }) => isDragging && css`
    opacity: 0.5;
    cursor: grabbing;
  `}

  ${({ isHovered, hoverDirection }) => isHovered && css`
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #eb8b0d;
      ${hoverDirection === "above" ? css`top: -5px;` : css`bottom: -5px;`}
    }

    ${hoverDirection === "above" && css`
      margin-bottom: 16px;
    `}

    ${hoverDirection === "below" && css`
      margin-top: 16px;
    `}
  `}

  &:active {
    cursor: grabbing;
  }
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
  
  &:active {
    cursor: grabbing;
  }
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