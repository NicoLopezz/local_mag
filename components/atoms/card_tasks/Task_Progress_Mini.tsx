import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

  const step = status ? statusSteps[status as keyof typeof statusSteps] : 0;
  const fillPercent = step > 0 ? ((step - 1) / 3) * 100 : 0;

  return (
    <ProgressContainer>
      <Track />
      <Fill
        initial={{ width: 0 }}
        animate={{ width: `${fillPercent}%` }}
        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      />
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

const Fill = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  background: black;
  border-radius: 4px;
  transform: translateY(-50%);
  transform-origin: left;
  z-index: 1;
`;

const Step = styled.div<{ $filled: boolean }>`
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${({ $filled }) => ($filled ? "black" : "white")};
  box-shadow: ${({ $filled }) => ($filled ? "0 0 3px rgba(0,0,0,0.5)" : "none")};
  transform: translate(-50%, -50%);
  z-index: 2;
`;
