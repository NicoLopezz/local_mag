import { FC } from "react";
import styled from "styled-components";
import { Pencil_Icon } from "@/components/atoms/icons/tasks_icons/Pencil_Icon";
import { Check_Icon } from "@/components/atoms/icons/envios_icons/Check_Icon";
import { Cancel_Icon } from "@/components/atoms/icons/envios_icons/Cancel_Icon";

interface Props {
  isEditing: boolean;
  onStartEdit: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export const Edit_Actions: FC<Props> = ({
  isEditing,
  onStartEdit,
  onConfirm,
  onCancel,
  className,
}) => {
  return (
    <div className={className}>
      {!isEditing && (
        <EditButton onClick={onStartEdit}>
          <Pencil_Icon />
        </EditButton>
      )}
      {isEditing && (
        <EditActions>
          <IconButton onClick={onConfirm}>
            <Check_Icon />
          </IconButton>
          <IconButton onClick={onCancel}>
            <Cancel_Icon />
          </IconButton>
        </EditActions>
      )}
    </div>
  );
};

const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
