import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Producto_Stock: FC = () => {
  const stockTotal = 30;
  const stockMinimo = 15;
  const consumoSemanal = 18;
  const diasReposicion = 12;
  const recomendacionPedido = 40;

  const stockPorSucursal = [
    { nombre: "Sucursal Centro", cantidad: 10 },
    { nombre: "Sucursal Norte", cantidad: 8 },
    { nombre: "Depósito Central", cantidad: 12 }
  ];

  const historial = [
    { fecha: "03/04/2025", tipo: "Salida", cantidad: 5 },
    { fecha: "01/04/2025", tipo: "Ingreso", cantidad: 20 },
    { fecha: "28/03/2025", tipo: "Salida", cantidad: 8 }
  ];

  const diasRestantes = Math.floor(stockTotal / (consumoSemanal / 7));

  return (
    <Motion_Container
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Section>
        <Title>Stock actual</Title>
        <Stock_Number low={stockTotal < stockMinimo}>{stockTotal} unidades</Stock_Number>
        {stockTotal < stockMinimo && <Badge>Stock bajo</Badge>}
      </Section>

      <Divider />

      <Section>
        <SubTitle>Distribución por sucursal</SubTitle>
        <List>
          {stockPorSucursal.map((s) => (
            <li key={s.nombre}>
              <strong>{s.nombre}:</strong> {s.cantidad} unidades
            </li>
          ))}
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Rotación y estimaciones</SubTitle>
        <List>
          <li>Días promedio entre ingresos: <strong>{diasReposicion}</strong></li>
          <li>Unidades vendidas por semana: <strong>{consumoSemanal}</strong></li>
          <li>Estimación de agotamiento: <strong>{diasRestantes} días</strong></li>
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Sugerencia de pedido</SubTitle>
        <List>
          <li>Reponer: <strong>{recomendacionPedido}</strong> unidades</li>
          <li>Próxima reposición: 08/04/2025</li>
          <li>Reposición automática: activada</li>
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Últimos movimientos</SubTitle>
        <List>
          {historial.map((mov, i) => (
            <li key={i}>
              {mov.fecha} – <strong>{mov.tipo}</strong> de <strong>{mov.cantidad}</strong> unidades
            </li>
          ))}
        </List>
      </Section>
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
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Stock_Number = styled.div<{ low?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ low }) => (low ? "#e63946" : "#2a9d8f")};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
`;

const Badge = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  background-color: #ffdddd;
  color: #c0392b;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: 500;
`;
