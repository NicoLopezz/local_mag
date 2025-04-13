import { FC } from "react";
import styled from "styled-components";
import { Pencil_Icon } from "@/components/atoms/icons/tasks_icons/Pencil_Icon";

interface Props {
  isEditing: boolean;
  title: string;
  onChange: (val: string) => void;
  onToggleEdit: () => void;
}

export const Task_Header_EditDetail: FC<Props> = ({
  isEditing,
  title,
  onChange,
  onToggleEdit,
}) => {
  return (
    <TopRow>
      {isEditing ? (
        <TitleInput value={title} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Title>{title}</Title>
      )}
      <EditIcon onClick={onToggleEdit}>
        <Pencil_Icon />
      </EditIcon>
    </TopRow>
  );
};

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  width: 100%;
`;

const TitleInput = styled.input`
  font-size: 1.3rem;
  font-weight: 700;
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const EditIcon = styled.div`
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  &:hover {
    background: #eee;
  }
`;

const SvgIcon = styled.svg`
  width: 16px;
  height: 16px;
`;
