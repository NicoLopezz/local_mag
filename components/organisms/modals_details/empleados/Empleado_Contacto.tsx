import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/empleados";

export const Empleado_Contacto: FC = () => {
  const { query } = useRouter();
  const email = typeof query.email === "string" ? query.email : "";
  const empleado = mockData.empleados.find((e) => e.email === email);

  if (!empleado) return <Mensaje>No se encontró el empleado</Mensaje>;

  return (
    <Contacto_Container>
      <Contacto_Content>
        <Title>Información de contacto</Title>
        <Divider />
        <Contact_List>
          <Item><Label>Nombre:</Label> {empleado.name}</Item>
          <Item><Label>Email:</Label> {empleado.email}</Item>
          <Item><Label>Teléfono:</Label> {empleado.phone}</Item>
        </Contact_List>
      </Contacto_Content>
    </Contacto_Container>
  );
};

const Contacto_Container = styled.div`
  flex: 2;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.4s ease;
`;

const Contacto_Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2e2e2e;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.25rem 0 0.5rem;
`;

const Contact_List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Item = styled.li`
  display: flex;
  gap: 0.25rem;
  line-height: 1.5;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
`;
