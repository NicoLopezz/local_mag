import { FC, useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

interface Props {
  onAdd: (taskName: string) => void;
}

export const New_Task_Card: FC<Props> = ({ onAdd }) => {
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
    <Wrapper $hoverable={!open}>
      {open ? (
        <Form>
          <Input
            placeholder="Escribe el título de la card..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <Actions>
            <AddButton onClick={handleAdd}>Añadir card</AddButton>
            <CancelButton onClick={handleCancel}>
              <X size={20} />
            </CancelButton>
          </Actions>
        </Form>
      ) : (
        <Trigger onClick={() => setOpen(true)}>+ Añadir una card</Trigger>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $hoverable: boolean }>`
  /* background: #f3f4f6; */
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 0.75rem;
  transition: transform 0.2s ease, background 0.2s ease;

  ${({ $hoverable }) =>
    $hoverable &&
    `
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      
    }
  `}
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: var(--dark-blue);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  background: #000;
  color: #fff;
  padding: 0.45rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

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

const Trigger = styled.button`
  background: #e5e7eb60;
  border: none;
  color: #000;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;

  &:hover {
    background: #d1d5db;
  }
`;
