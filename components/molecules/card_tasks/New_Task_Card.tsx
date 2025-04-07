import { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  onAdd: (taskName: string) => void;
}

export const New_Task_Card: FC<Props> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <Card>
      <Input
        placeholder="Nueva tarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <AddButton onClick={handleAdd}>Agregar</AddButton>
    </Card>
  );
};

const Card = styled.div`
  background-color: var(--white);
  width: 80%;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  font-size: 14px;
  padding: 8px 10px;
  border: 1px solid var(--grey);
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: var(--strong-green);
  }
`;

const AddButton = styled.button`
  /* background: #1111119f; */
  color: #080808;
  padding: 5px;
  border: none;
  border-radius: 8px;
  font-weight: 100;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
  text-align: center;
  width: 40%;

  &:hover {
    color: #ffffff;
    background: #000000;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;
