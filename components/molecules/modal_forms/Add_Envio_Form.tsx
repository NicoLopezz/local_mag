import { FC, useState } from "react";
import styled from "styled-components";

interface EnvioItemProps {
  id: string;
  time: string;
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
  clienteName: string;
  direccion: string;
  progress: "25" | "50" | "75" | "100";
}

interface EnvioFormProps {
  onSubmit: (envio: EnvioItemProps) => void;
}

const Form_Title: FC<{ children: string }> = ({ children }) => {
  return <Styled_Title>{children}</Styled_Title>;
};

export const Add_Envio_Form: FC<EnvioFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    clienteName: "",
    provincia: "",
    calle: "",
    altura: "",
    codigoPostal: "",
    status: "pendiente" as const,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.clienteName.trim() || !form.provincia.trim() || !form.calle.trim() || !form.altura.trim() || !form.codigoPostal.trim()) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const time = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const direccion = `${form.provincia} ${form.calle} ${form.altura} CP ${form.codigoPostal}`;

    const newEnvio: EnvioItemProps = {
      id: `envio-${Date.now()}`,
      time,
      status: form.status,
      clienteName: form.clienteName,
      direccion,
      progress: "25",
    };
    onSubmit(newEnvio);
  };

  return (
    <Form_Container onSubmit={handleSubmit}>
      <Form_Title>Crear Nuevo Envío</Form_Title>

      <Styled_Input
        name="clienteName"
        placeholder="Nombre del cliente"
        value={form.clienteName}
        onChange={handleChange}
        required
      />

      <Styled_Input
        name="provincia"
        placeholder="Provincia"
        value={form.provincia}
        onChange={handleChange}
        required
      />

      <Styled_Input
        name="calle"
        placeholder="Calle"
        value={form.calle}
        onChange={handleChange}
        required
      />

      <Styled_Input
        name="altura"
        placeholder="Altura"
        value={form.altura}
        onChange={handleChange}
        required
      />

      <Styled_Input
        name="codigoPostal"
        placeholder="Código Postal"
        value={form.codigoPostal}
        onChange={handleChange}
        required
      />

      <Content_Wrapper>
        <Styled_Select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_camino">En camino</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </Styled_Select>

        <Styled_Button type="submit">Crear Envío</Styled_Button>
      </Content_Wrapper>
    </Form_Container>
  );
};

const Form_Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const Content_Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 150px;
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
