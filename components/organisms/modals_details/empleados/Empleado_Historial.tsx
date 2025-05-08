import { FC } from "react";
import styled from "styled-components";
import {
  LineChart,
  BarChart,
  PieChart,
} from "@/components/molecules/empleados/Charts";
import {
  ProgressCard,
  MetricCard,
} from "@/components/molecules/empleados/Cards";

interface HistorialEmpleado {
  id: string;
  nombre: string;
  puesto: string;
  fechaIngreso: string;
  historialSalarial: {
    fecha: string;
    salario: number;
    motivo: string;
  }[];
  presentismo: {
    mes: string;
    diasPresentes: number;
    diasTotales: number;
    porcentaje: number;
  }[];
  metricasLaborales: {
    mes: string;
    enviosRealizados?: number;
    tareasCompletadas?: number;
    clientesAtendidos?: number;
    horasExtras?: number;
  }[];
  evaluaciones: {
    fecha: string;
    tipo: string;
    puntaje: number;
    comentarios: string;
  }[];
  capacitaciones: {
    fecha: string;
    nombre: string;
    duracion: number;
    completada: boolean;
  }[];
}

interface Props {
  empleado: HistorialEmpleado;
}

export const Empleado_Historial: FC<Props> = ({ empleado }) => {
  const salarioData = empleado.historialSalarial.map((item) => ({
    fecha: new Date(item.fecha).toLocaleDateString("es-AR", {
      month: "short",
      year: "numeric",
    }),
    salario: item.salario,
  }));

  const presentismoData = empleado.presentismo.map((item) => ({
    mes: item.mes,
    presentismo: item.porcentaje,
  }));

  const ultimoMes =
    empleado.metricasLaborales[empleado.metricasLaborales.length - 1];
  const meses = empleado.metricasLaborales.map((item) => item.mes);

  return (
    <HistorialContainer>
      {/* <Header>
        <Title>Historial de {empleado.nombre}</Title>
        <Subtitle>
          Legajo: {empleado.id} | Ingreso:{" "}
          {new Date(empleado.fechaIngreso).toLocaleDateString()}
        </Subtitle>
      </Header>

      <MetricsGrid>
        <MetricCard
          title="Antigüedad"
          value={`${Math.floor(
            (Date.now() - new Date(empleado.fechaIngreso).getTime()) /
              (1000 * 60 * 60 * 24 * 365)
          )} años`}
          icon="calendar"
        />

        <MetricCard
          title="Último salario"
          value={`$${empleado.historialSalarial[
            empleado.historialSalarial.length - 1
          ].salario.toLocaleString()}`}
          icon="dollar"
          trend="up"
          change={`${(
            ((empleado.historialSalarial[empleado.historialSalarial.length - 1]
              .salario -
              empleado.historialSalarial[0].salario) /
              empleado.historialSalarial[0].salario) *
            100
          ).toFixed(1)}% desde ingreso`}
        />
        <MetricCard
          title="Presentismo último mes"
          value={`${
            empleado.presentismo[empleado.presentismo.length - 1].porcentaje
          }%`}
          icon="check-circle"
          trend={
            empleado.presentismo[empleado.presentismo.length - 1].porcentaje >
            95
              ? "up"
              : "down"
          }
        />
        <MetricCard
          title="Envios último mes"
          value={ultimoMes.enviosRealizados?.toString() || "N/A"}
          icon="package"
        />
      </MetricsGrid>

      <ChartsSection>
        <ChartContainer>
          <ChartTitle>Evolución Salarial</ChartTitle>
          <LineChart
            data={salarioData}
            xField="fecha"
            yField="salario"
            color="#4a6bdf"
            height={300}
            yAxisFormatter={(val) => `$${val.toLocaleString()}`}
          />
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Presentismo últimos 12 meses</ChartTitle>
          <BarChart
            data={presentismoData}
            xField="mes"
            yField="presentismo"
            color="#10b981"
            height={300}
            yAxisFormatter={(val) => `${val}%`}
            maxValue={100}
          />
        </ChartContainer>
      </ChartsSection>

      <ChartsSection>
        {ultimoMes.tareasCompletadas !== undefined && (
          <ChartContainer>
            <ChartTitle>Productividad (tareas completadas)</ChartTitle>
            <LineChart
              data={empleado.metricasLaborales.map((item) => ({
                label: item.mes,
                value: item.tareasCompletadas ?? 0,
              }))}
              xField="mes"
              yField="tareas"
              color="#f59e0b"
              height={300}
            />
          </ChartContainer>
        )}

        {ultimoMes.clientesAtendidos !== undefined && (
          <ChartContainer>
            <ChartTitle>Atención a clientes</ChartTitle>
            <BarChart
              data={empleado.metricasLaborales.map((item) => ({
                mes: item.mes,
                clientes: item.clientesAtendidos,
              }))}
              xField="mes"
              yField="clientes"
              color="#8b5cf6"
              height={300}
            />
          </ChartContainer>
        )}
      </ChartsSection>

      <HalfSection>
        <Section>
          <SectionTitle>Últimas evaluaciones</SectionTitle>
          <EvaluacionesList>
            {empleado.evaluaciones.slice(0, 3).map((eval, index) => (
              <EvaluacionItem key={index}>
                <EvalHeader>
                  <EvalTipo>{eval.tipo}</EvalTipo>
                  <EvalFecha>
                    {new Date(eval.fecha).toLocaleDateString()}
                  </EvalFecha>
                </EvalHeader>
                <ProgressCard
                  value={eval.puntaje}
                  max={10}
                  label={`Puntaje: ${eval.puntaje}/10`}
                  color={
                    eval.puntaje >= 8
                      ? "#10b981"
                      : eval.puntaje >= 6
                      ? "#f59e0b"
                      : "#ef4444"
                  }
                />
                <EvalComentario>{eval.comentarios}</EvalComentario>
              </EvaluacionItem>
            ))}
          </EvaluacionesList>
        </Section>

        <Section>
          <SectionTitle>Capacitaciones recientes</SectionTitle>
          <CapacitacionesList>
            {empleado.capacitaciones.slice(0, 4).map((cap, index) => (
              <CapacitacionItem key={index} completed={cap.completada}>
                <CapNombre>{cap.nombre}</CapNombre>
                <CapDetalle>
                  <span>{new Date(cap.fecha).toLocaleDateString()}</span>
                  <span>{cap.duracion} horas</span>
                  <CapEstado>
                    {cap.completada ? "✅ Completada" : "⏳ En curso"}
                  </CapEstado>
                </CapDetalle>
              </CapacitacionItem>
            ))}
          </CapacitacionesList>
        </Section>
      </HalfSection> */}
    </HistorialContainer>
  );
};

const HistorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 0;
  color: #333;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 16px 0;
  color: #4a6bdf;
  font-weight: 600;
`;

const HalfSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
  color: #4a6bdf;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0e0e0;
`;

const EvaluacionesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EvaluacionItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EvalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EvalTipo = styled.span`
  font-weight: 600;
  color: #333;
`;

const EvalFecha = styled.span`
  font-size: 14px;
  color: #666;
`;

const EvalComentario = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
`;

const CapacitacionesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CapacitacionItem = styled.div<{ completed: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${(props) => (props.completed ? "#10b981" : "#f59e0b")};
`;

const CapNombre = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const CapDetalle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

// const CapEstado = styled.span`
//   color: ${(props) => (props.theme === "completed" ? "#10b981" : "#f59e0b")};
//   font-weight: 500;
// `;
