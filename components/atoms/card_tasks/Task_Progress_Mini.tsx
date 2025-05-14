import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  status: string;
}

export const Task_Progress_Mini: FC<Props> = ({ status }) => {
  const statusSteps = {
    "Paso 1": 1,
    "Paso 2": 2,
    "Paso 3": 3,
    "Paso 4": 4,
  };

  const validSteps = ["Paso 1", "Paso 2", "Paso 3", "Paso 4"];
  const step = validSteps.includes(status) ? statusSteps[status as keyof typeof statusSteps] : 1;
  const fillPercent = step > 0 ? ((step - 1) / 3) * 100 : 0;

  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    setFillWidth(fillPercent);
  }, [fillPercent]);

  if (!validSteps.includes(status)) return null;

  return (
    <ProgressContainer>
      <Track />
      <Fill style={{ width: `${fillWidth}%` }} />
      {[1, 2, 3, 4].map((s, idx) => (
        <Step
          key={s}
          $filled={step >= s}
          style={{ left: `${(idx / 3) * 100}%` }}
        />
      ))}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 12px;
  height: 20px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #ccc;
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 0;
`;

const Fill = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  background: #00000056;
  border-radius: 4px;
  transform: translateY(-50%);
  transform-origin: left;
  transition: width 0.6s ease;
  z-index: 1;
`;

const Step = styled.div<{ $filled: boolean }>`
  position: absolute;
  top: 50%;
  width: 7px;
  height: 7px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${({ $filled }) => ($filled ? "#606060" : "white")};
  box-shadow: ${({ $filled }) => ($filled ? "0 0 3px rgba(0, 0, 0, 0.069)" : "none")};
  transform: translate(-50%, -50%);
  z-index: 2;
`;
