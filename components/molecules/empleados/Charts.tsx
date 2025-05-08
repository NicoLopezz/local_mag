import { FC } from "react";
import styled from "styled-components";

interface ChartProps {
  data: { label: string; value: number }[];
  xField: string;
  yField: string;
  color: string;
  height: number;
}

const ChartContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

const ChartBars = styled.div`
  display: flex;
  align-items: flex-end;
  height: 200px;
  gap: 10px;
`;

const Bar = styled.div<{ height: number; color: string }>`
  flex: 1;
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  border-radius: 4px 4px 0 0;
  transition: height 0.5s ease;
  position: relative;
  min-width: 30px;
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -25px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #666;
`;

const ValueLabel = styled.div`
  position: absolute;
  top: -20px;
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const ChartLines = styled.svg`
  width: 100%;
  height: 200px;
`;

export const BarChart: FC<ChartProps> = ({ data, color = "#4a6bdf" }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 0) || 100;

  return (
    <ChartContainer>
      <ChartBars>
        {data.map((item, index) => (
          <Bar
            key={index}
            height={(item.value / maxValue) * 100}
            color={color}
          >
            <ValueLabel>{item.value}</ValueLabel>
            <BarLabel>{item.label}</BarLabel>
          </Bar>
        ))}
      </ChartBars>
    </ChartContainer>
  );
};

export const LineChart: FC<ChartProps> = ({ data, color = "#4a6bdf" }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 0) || 100;
  const chartHeight = 200;
  const pointRadius = 5;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (item.value / maxValue) * 100;
    return { x, y, value: item.value, label: item.label };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x}% ${point.y}%`)
    .join(" ");

  return (
    <ChartContainer>
      <ChartLines viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Eje X */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="#ddd" strokeWidth="1" />
        
        
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Puntos */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r={pointRadius}
              fill={color}
            />
            <text
              x={`${point.x}%`}
              y={`${point.y - 5}%`}
              textAnchor="middle"
              fontSize="3"
              fill="#333"
            >
              {point.value}
            </text>
            <text
              x={`${point.x}%`}
              y="105%"
              textAnchor="middle"
              fontSize="3"
              fill="#666"
            >
              {point.label}
            </text>
          </g>
        ))}
      </ChartLines>
    </ChartContainer>
  );
};

export const PieChart: FC<ChartProps> = ({ data, color = "#4a6bdf" }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  return (
    <ChartContainer>
      <ChartLines viewBox="0 0 100 100">
        {data.map((item, index) => {
          const percent = (item.value / total) * 100;
          const startPercent = cumulativePercent;
          cumulativePercent += percent;

          // Coordenadas para el arco del pie
          const x1 = 50 + 50 * Math.cos((2 * Math.PI * startPercent) / 100);
          const y1 = 50 + 50 * Math.sin((2 * Math.PI * startPercent) / 100);
          const x2 = 50 + 50 * Math.cos((2 * Math.PI * cumulativePercent) / 100);
          const y2 = 50 + 50 * Math.sin((2 * Math.PI * cumulativePercent) / 100);

          // Large arc flag (1 si es más de 180 grados)
          const largeArcFlag = percent > 50 ? 1 : 0;

          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
          ].join(" ");

          // Posición para la etiqueta
          const labelX = 50 + 30 * Math.cos((2 * Math.PI * (startPercent + percent / 2)) / 100);
          const labelY = 50 + 30 * Math.sin((2 * Math.PI * (startPercent + percent / 2)) / 100);

          return (
            <g key={index}>
              <path
                d={pathData}
                fill={`${color}${Math.floor(100 - index * 15).toString(16).padStart(2, '0')}`}
                stroke="#fff"
                strokeWidth="0.5"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontSize="3"
                fill="#fff"
              >
                {`${Math.round(percent)}%`}
              </text>
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fontSize="2"
                fill="#fff"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </ChartLines>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '0 5px' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              backgroundColor: `${color}${Math.floor(100 - index * 15).toString(16).padStart(2, '0')}`,
              marginRight: '5px'
            }}></span>
            {item.label}
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

