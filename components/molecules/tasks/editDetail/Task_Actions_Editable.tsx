import { FC } from "react";
import styled from "styled-components";

interface Props {
  showSave: boolean;
  onSave: () => void;
  onDelete: () => void;
}

export const Task_Actions_EditDetail: FC<Props> = ({ showSave, onSave, onDelete }) => {
  return (
    <Actions>
      {showSave && (
        <Button onClick={onSave}>
          <SvgIcon viewBox="0 0 24 24">
            <path d="M17 3H7a2 2 0 0 0-2 2v14l5-2 5 2V5a2 2 0 0 0-2-2z" fill="currentColor" />
          </SvgIcon>
          Guardar
        </Button>
      )}
      <DeleteButton onClick={onDelete}>
        <SvgIcon viewBox="0 0 24 24">
          <path
            d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m-1 0v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </SvgIcon>
        Eliminar
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
  background-color: #000000e4;
  color: white;
  font-weight: 400;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c3aa9;
  }
`;

const DeleteButton = styled.button`
  background-color: #000000;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
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
