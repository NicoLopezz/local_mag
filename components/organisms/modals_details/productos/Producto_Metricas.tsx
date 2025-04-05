import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

export const Producto_Metricas: FC = () => {
  const ventasPorSemana = [
    { semana: "01/03", ventas: 20 },
    { semana: "08/03", ventas: 35 },
    { semana: "15/03", ventas: 30 },
    { semana: "22/03", ventas: 45 },
    { semana: "29/03", ventas: 25 }
  ];

  const rotacionMensual = [
    { mes: "Ene", rotacion: 80 },
    { mes: "Feb", rotacion: 60 },
    { mes: "Mar", rotacion: 90 },
    { mes: "Abr", rotacion: 75 }
  ];

  const margenBruto = 42;

  return (
    <Motion_Container
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Section>
        <Title>Ventas semanales</Title>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ventasPorSemana}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semana" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ventas" stroke="#007acc" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <Divider />

      <Section>
        <Title>Rotación mensual</Title>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={rotacionMensual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rotacion" fill="#2a9d8f" />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      <Divider />

      <KPIBox>
        <KPI_Title>Margen Bruto</KPI_Title>
        <KPI_Value>{margenBruto}%</KPI_Value>
        <KPI_Description>Rentabilidad sobre costo promedio</KPI_Description>
      </KPIBox>
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.4s ease;
`;

const Section = styled.div``;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
`;

const KPIBox = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const KPI_Title = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
`;

const KPI_Value = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2a9d8f;
  margin: 0.5rem 0;
`;

const KPI_Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;
