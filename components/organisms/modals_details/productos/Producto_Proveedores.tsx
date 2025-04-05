import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Producto_Proveedores: FC = () => {
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
    <Motion_Container
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
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
    </Motion_Container>
  );
};

const Motion_Container = styled(motion.div)`
  flex: 2;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  height: 80%;
  overflow-y: auto;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  display: flex;
  flex-direction: column;
  gap: 2rem;
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
