import { FC } from "react";
import styled from "styled-components";

interface ProgressBarProps {
  progress: "25" | "50" | "75" | "100";
  $isSelected?: boolean;
  status?: "cancelado" | "pendiente" | "en_camino" | "entregando";
}


export const Progress_Bar: FC<ProgressBarProps> = ({ progress, $isSelected }) => {
  const getActiveStep = () => {
    if (progress === "25") return 1;
    if (progress === "50") return 2;
    if (progress === "75") return 3;
    if (progress === "100") return 4;
    return 0;
  };

  const activeStep = getActiveStep();

  return (
    <Bar_Container>
      <Line />
      {[1, 2, 3, 4].map((step) => (
        <Step key={step} style={{ left: `${(step - 1) * 33}%` }}>
          <Circle active={step <= activeStep} />
        </Step>
      ))}
    </Bar_Container>
  );
};

const Bar_Container = styled.div`
  position: relative;
  width: 16%;
  height: 30px;
  margin-right: 2%;
`;

const Line = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1.5px;
  background-color: #000000;
  z-index: 1;
`;

const Step = styled.div`
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const Circle = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => (active ? "#000000" : theme.colors.contenedores)};
  border: 1px solid #aaa;
`;
