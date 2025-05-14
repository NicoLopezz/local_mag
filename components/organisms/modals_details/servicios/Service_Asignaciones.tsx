import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/servicios";

export const Service_Asignaciones: FC = () => {
  const { query } = useRouter();
  const serviceTitle = typeof query.service === "string" ? query.service : "";
  const service = mockData.services.find((s) => s.title === serviceTitle);

  if (!service) return <Mensaje>No se encontró el servicio</Mensaje>;

  return (
    <Asignaciones_Container>
      <Title>Asignaciones del servicio</Title>
      <Divider />
      <List>
        <Item>Cliente: ACME Corp.</Item>
        <Item>Equipo: Consultoría Estratégica</Item>
        <Item>Responsable: María Gómez</Item>
      </List>
    </Asignaciones_Container>
  );
};

const Asignaciones_Container = styled.div`
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

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2e2e2e;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Item = styled.li`
  line-height: 1.6;
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
`;
