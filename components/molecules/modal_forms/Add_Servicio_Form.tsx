import { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  onSubmit: (product: ProductInput) => void;
}

interface ProductInput {
  title: string;
  description: string;
}

const Form_Title: FC<{ children: string }> = ({ children }) => {
  return <Styled_Title>{children}</Styled_Title>;
};

export const Add_Servicio_Form: FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      description: form.description,
    });
  };

  return (
    <Form_Container onSubmit={handleSubmit}>
      <Form_Title>Agregar Servicio</Form_Title>

      <Styled_Input
        name="title"
        placeholder="Nombre del Servicio"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Styled_Textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
      />
      <Form_Row>
        <Styled_Button type="submit">Guardar</Styled_Button>
      </Form_Row>
    </Form_Container>
  );
};

const Form_Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const Form_Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  gap: 1rem;
`;

const Styled_Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  
  &::placeholder {
    font-family: 'YourFontFamily', sans-serif; 
    font-size: 1rem; 
    color: #888; 
  }

  &:focus {
    border-color: #555;
  }
`;

const Styled_Textarea = styled.textarea`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  outline: none;
  transition: border 0.2s;
  
  &::placeholder {
    font-family: 'YourFontFamily', sans-serif; 
    font-size: 1rem; 
    color: #888; 
  }

  &:focus {
    border-color: #555;
  }
`;



const Styled_Button = styled.button`
  flex: 1;
  background: #111;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 200;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #000;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const Styled_Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
