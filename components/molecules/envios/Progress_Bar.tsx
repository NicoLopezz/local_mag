import { FC } from "react";
import styled from "styled-components";
import { EnvioLista_Icon } from "@/components/atoms/icons/envios_icons/EnvioLista_Icon";
import { Entregado_Icon } from "@/components/atoms/icons/envios_icons/Entregado_Icon";
import { Pendiente_Icon } from "@/components/atoms/icons/envios_icons/Pendiente_Icon";
import { Cancelado_Icon } from "@/components/atoms/icons/envios_icons/Cancelado_Icon";

interface ProgressBarProps {
  progress: "25" | "50" | "75" | "100";
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
}

export const Progress_Bar: FC<ProgressBarProps> = ({ progress, status }) => {
  const getIcon = () => {
    if (status === "pendiente") return <Pendiente_Icon />;
    if (status === "en_camino") return <EnvioLista_Icon />;
    if (status === "entregado") return <Entregado_Icon />;
    if (status === "cancelado") return <Cancelado_Icon />;
    return null;
  };

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
          {step === activeStep ? (
            <IconWrapper>{getIcon()}</IconWrapper>
          ) : (
            <Circle active={step < activeStep} />
          )}
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
  top: 55%;
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
  background-color: ${({ active }) => (active ? "#000000" : "#fff")};
  border: 2px solid #aaa;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;  
  position: absolute;
  top: -2px;
  /* bottom: px; */
`;

const Label = styled.span`
  margin-top: 2px;
  font-size: 10px;
  color: #666;
`;
