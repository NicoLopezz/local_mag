import { FC } from "react";
import styled from "styled-components";
import { Divider } from "@/components/atoms/Divider";

export const Producto_Metricas: FC = () => {
  const ventasPorSemana = [
    { semana: "01/03", ventas: 20 },
    { semana: "08/03", ventas: 35 },
    { semana: "15/03", ventas: 30 },
    { semana: "22/03", ventas: 45 },
    { semana: "29/03", ventas: 25 },
  ];

  const rotacionMensual = [
    { mes: "Ene", rotacion: 80 },
    { mes: "Feb", rotacion: 60 },
    { mes: "Mar", rotacion: 90 },
    { mes: "Abr", rotacion: 75 },
  ];

  const margenBruto = 42;

  const maxVentas = Math.max(...ventasPorSemana.map(v => v.ventas)) || 1;
  const maxRotacion = Math.max(...rotacionMensual.map(r => r.rotacion)) || 1;

  return (
    <Container>
      <Section>
        <Title>Variacion de Ventas</Title>
        <ChartWrapper>
          {ventasPorSemana.map((v, i) => (
            <BarWrapper key={i}>
              <Bar $height={(v.ventas / maxVentas) * 100} />
              <Label>{v.semana}</Label>
            </BarWrapper>
          ))}
        </ChartWrapper>
      </Section>

      <Divider />

      <Section>
        <Title>Variacion de Stock</Title>
        <ChartWrapper>
          {rotacionMensual.map((r, i) => (
            <BarWrapper key={i}>
              <Bar $height={(r.rotacion / maxRotacion) * 100} $color="#2a9d8f" />
              <Label>{r.mes}</Label>
            </BarWrapper>
          ))}
        </ChartWrapper>
      </Section>

      <Divider />

      <KPIBox>
        <KPI_Title>Margen Bruto</KPI_Title>
        <KPI_Value>{margenBruto}%</KPI_Value>
        <KPI_Description>Rentabilidad sobre costo promedio</KPI_Description>
      </KPIBox>
    </Container>
  );
};

const Container = styled.div`
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
  animation: fadeInUp 0.3s ease forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Section = styled.div``;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;



const ChartWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  height: 200px;
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 8px;
`;

const BarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const Bar = styled.div<{ $height: number; $color?: string }>`
  width: 30px;
  height: ${({ $height }) => $height}%;
  background-color: ${({ $color }) => $color || "#007acc"};
  border-radius: 6px 6px 0 0;
  transition: height 0.4s ease;
`;

const Label = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.text};
`;

const KPI_Value = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2a9d8f;
  margin: 0.5rem 0;
`;

const KPI_Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
