import { FC, useState } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface PedidoFormProps {
  onSubmit: (pedido: {
    proveedorName: string;
    status: "abierto" | "cerrado" | "cancelado";
    time?: string;
  }) => void;
}

const Form_Title: FC<{ children: string }> = ({ children }) => {
  return <Styled_Title>{children}</Styled_Title>;
};

export const Add_Pedido_Form: FC<PedidoFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    proveedorName: "",
    status: "abierto" as const,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { t } = useLang();
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const time = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formData = {
    ...form,
    time,
  };
  onSubmit(formData);
  };

  return (
    <Form_Container onSubmit={handleSubmit}>
      <Form_Title>{t.orders.createPedidoTitle}</Form_Title>
  
      <Styled_Input
        name="proveedorName"
        placeholder={t.orders.placeholders.proveedor}
        value={form.proveedorName}
        onChange={handleChange}
        required
      />
  
      <Content_Wraper>
        <Styled_Select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="abierto">{t.orders.statusLabels.abierto}</option>
          <option value="cerrado">{t.orders.statusLabels.cerrado}</option>
          <option value="cancelado">{t.orders.statusLabels.cancelado}</option>
        </Styled_Select>
  
        <Styled_Button type="submit">{t.orders.createPedidoButton}</Styled_Button>
      </Content_Wraper>
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

const Content_Wraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 150px;
`;

const Form_Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
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

  &:focus {
    border-color: #555;
  }
`;

const Styled_Input_Stock = styled.input`
  padding: 0.75rem;
  width: 100px;
  min-width: 80px;
  max-width: 140px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;

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
    font-family: "YourFontFamily", sans-serif;
    font-size: 1rem;
    color: #888;
  }

  &:focus {
    border-color: #555;
  }
`;

const Styled_Button = styled.button`

  background-color: ${({ disabled, theme }) =>
    disabled ? "#f9f9f99" : theme.colors.button};
  color: ${({ disabled}) =>
    disabled ? "#a0a0a0": "white"};
  font-size: ${({ theme }) => theme.fontSizes.text}px;

  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 200;
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

const Styled_Select = styled.select`
  padding: 0.75rem;
  padding-right: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #2a9d8f;
  }
`;
