import { FC } from "react";
import styled from "styled-components";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  change?: string;
}

interface ProgressCardProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
}

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MetricTitle = styled.h3`
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const MetricChange = styled.div<{ trend?: "up" | "down" | "neutral" }>`
  font-size: 12px;
  color: ${(props) => 
    props.trend === "up" ? "#10b981" : 
    props.trend === "down" ? "#ef4444" : "#666"};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProgressContainer = styled.div`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 8px 0;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const ProgressLabel = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
`;

export const MetricCard: FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  change 
}) => {
  return (
    <Card>
      <MetricTitle>
        {icon && <span>{icon}</span>}
        {title}
      </MetricTitle>
      <MetricValue>{value}</MetricValue>
      {change && (
        <MetricChange trend={trend}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {change}
        </MetricChange>
      )}
    </Card>
  );
};

export const ProgressCard: FC<ProgressCardProps> = ({ 
  value, 
  max, 
  label, 
  color = "#4a6bdf" 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <Card>
      {label && <MetricTitle>{label}</MetricTitle>}
      <ProgressContainer>
        <ProgressBar width={percentage} color={color} />
      </ProgressContainer>
      <ProgressLabel>
        <span>{value}</span>
        <span>{max}</span>
      </ProgressLabel>
    </Card>
  );
};