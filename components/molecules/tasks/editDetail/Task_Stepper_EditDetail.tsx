import { FC } from "react";
import styled from "styled-components";

interface Props {
  step: number;
}

export const Task_Stepper_EditDetail: FC<Props> = ({ step }) => {
  const fillPercent = step > 1 ? ((step - 1) / 3) * 100 : 0;

  return (
    <StepperContainer>
      <StepTrack />
      <StepFill style={{ width: `${fillPercent}%` }} />
      {[1, 2, 3, 4].map((s, idx) => {
        const isSelected = step === s;
        const isCompleted = step > s;
        const isActive = step >= s;

        return (
          <StepCircleWrapper key={s} style={{ left: `${idx * 33.3333}%` }}>
            <StepCircle
              $completed={isCompleted}
              $selected={isSelected}
              $active={isActive}
            />
            <StepLabel $completed={isCompleted} $selected={isSelected}>
              {`Paso ${s}`}
            </StepLabel>
          </StepCircleWrapper>
        );
      })}
    </StepperContainer>
  );
};

const StepperContainer = styled.div`
  position: relative;
  width: 80%;
  height: 60px;
  margin: 0 auto;
`;

const StepTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #ccc;
  transform: translateY(-50%);
  z-index: 1;
`;

const StepFill = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background: #333;
  transform: translateY(-50%);
  z-index: 2;
  transition: width 0.3s ease;
`;

const StepCircleWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div<{
  $completed: boolean;
  $selected: boolean;
  $active: boolean;
}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #898989;
  background-color: ${({ $completed, $selected }) =>
    $completed || $selected ? "#333" : "#fff"};
  transform: ${({ $selected }) => ($selected ? "scale(1.2)" : "scale(1)")};
  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 10px rgba(0, 0, 0, 0.35)" : "none"};
  transition: all 0.3s ease;
`;

const StepLabel = styled.span<{ $selected?: boolean; $completed?: boolean }>`
  position: absolute;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  color: ${({ $selected, $completed }) =>
    $selected || $completed ? "#111" : "#aaa"};
`;
