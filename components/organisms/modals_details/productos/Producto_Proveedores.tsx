import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export const Producto_Proveedores: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const proveedores = [
    {
      nombre: "Distribuidora Sur S.A.",
      contacto: "Juan Pérez",
      email: "juan@distribuidorasur.com",
      telefono: "+54 9 11 2345-6789",
      ultimaEntrega: "25/03/2025",
      proximaEntrega: "10/04/2025",
      frecuencia: "Cada 15 días"
    },
    {
      nombre: "Mayorista Centro",
      contacto: "María López",
      email: "maria@mayoristacentro.com",
      telefono: "+54 9 299 456-7890",
      ultimaEntrega: "20/03/2025",
      proximaEntrega: "05/04/2025",
      frecuencia: "Semanal"
    }
  ];

  return (
    <Container $mounted={mounted}>
      {proveedores.map((prov, i) => (
        <ProveedorBox key={i}>
          <Title>{prov.nombre}</Title>
          <SubTitle>Contacto</SubTitle>
          <List>
            <li><b>Persona:</b> {prov.contacto}</li>
            <li><b>Teléfono:</b> {prov.telefono}</li>
            <li><b>Email:</b> {prov.email}</li>
          </List>

          <SubTitle>Entrega</SubTitle>
          <List>
            <li><b>Última entrega:</b> {prov.ultimaEntrega}</li>
            <li><b>Próxima entrega:</b> {prov.proximaEntrega}</li>
            <li><b>Frecuencia:</b> {prov.frecuencia}</li>
          </List>
        </ProveedorBox>
      ))}
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div<{ $mounted: boolean }>`
  flex: 2;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${({ $mounted }) => ($mounted ? fadeIn : "none")} 0.3s ease;
`;

const ProveedorBox = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #333;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  color: #555;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
