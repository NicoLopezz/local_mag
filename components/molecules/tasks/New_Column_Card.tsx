import { FC, useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

interface Props {
  onAdd: (title: string) => void;
}

export const New_Column_Card: FC<Props> = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (input.trim() !== "") {
      onAdd(input.trim());
      setInput("");
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setInput("");
    setOpen(false);
  };

  return (
    <Container>
      {open ? (
        <Form>
          <Input
            placeholder="Nombre de la columna..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <Actions>
            <AddButton onClick={handleAdd}>Agregar columna</AddButton>
            <CancelButton onClick={handleCancel}>
              <X size={20} />
            </CancelButton>
          </Actions>
        </Form>
      ) : (
        <CreateTrigger onClick={() => setOpen(true)}>+ Nueva columna</CreateTrigger>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 1rem;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #6b7280;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111;
  }
`;

const CreateTrigger = styled.button`
  background: transparent;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark-blue);
  cursor: pointer;
  text-align: left;
  padding: 0;
`;
