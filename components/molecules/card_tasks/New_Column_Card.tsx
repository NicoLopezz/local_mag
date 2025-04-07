import { FC, useState } from "react";
import styled from "styled-components";

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

  return (
    <Container>
      {open ? (
        <>
          <Input
            placeholder="Nombre columna"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <AddButton onClick={handleAdd}>Agregar</AddButton>
        </>
      ) : (
        <CreateTrigger onClick={() => setOpen(true)}>+ Nueva columna</CreateTrigger>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 12px;
  padding: 16px;
  width: 280px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  font-size: 14px;
  padding: 6px 8px;
  border: 1px solid var(--grey);
  border-radius: 4px;
`;

const AddButton = styled.button`
  background-color: var(--strong-green);
  color: var(--white);
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  align-self: flex-start;
`;

const CreateTrigger = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--dark-blue);
  cursor: pointer;
  text-align: left;
  padding: 0;
`;
