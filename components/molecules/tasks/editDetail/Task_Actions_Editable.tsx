import { FC } from "react";
import styled from "styled-components";
import { Delete_Icon } from "@/components/atoms/icons/Delete_Icon";
import { Save_Icon } from "@/components/atoms/icons/Save_Icon";
import { useLang } from "@/context/Language_Context";

interface Props {
  showSave: boolean;
  onSave: () => void;
  onDelete: () => void;
}

export const Task_Actions_EditDetail: FC<Props> = ({ showSave, onSave, onDelete }) => {
  const { t } = useLang();

  return (
    <Actions>
      {showSave && (
        <Button onClick={onSave}>
          <Save_Icon />
          {t.tasks.modals.taskDescription.save}
        </Button>
      )}
      <DeleteButton onClick={onDelete}>
        <Delete_Icon />
        {t.tasks.modals.taskDescription.delete}
      </DeleteButton>
    </Actions>
  );
};


const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: ${({ disabled, theme }) =>
    disabled ? "#f9f9f99" : theme.colors.button};
  
  font-size: ${({ theme }) => theme.fontSizes.text}px;

  gap: 5px;
  font-weight: 400;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008732;
  }
`;

const DeleteButton = styled.button`
  background-color: ${({ disabled, theme }) =>
    disabled ? "#f9f9f99" : theme.colors.button};
  color: ${({ disabled}) =>
    disabled ? "#a0a0a0": "white"};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  gap: 5px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SvgIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;
