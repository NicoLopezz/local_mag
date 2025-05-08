import { FC } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const Color_Circle_Picker: FC<Props> = ({ label, value, onChange }) => {
  return (
    <ColorBlockContainer>
      <LabelAndCode>
        <ColorLabelText>{label}</ColorLabelText>
        <ColorCode>{value.toUpperCase()}</ColorCode>
      </LabelAndCode>
      <ColorPickerWrapper color={value}>
        <HiddenColorInput
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </ColorPickerWrapper>
    </ColorBlockContainer>
  );
};

const ColorBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 60px;
  padding: 0.0rem 0.5rem;
  border-radius: 12px;
`;

const LabelAndCode = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ColorLabelText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  font-weight: 800;
  color: #2d3748;
`;

const ColorPickerWrapper = styled.label<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background-color: ${({ color }) => color};
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

const HiddenColorInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ColorCode = styled.span`
  font-size: ${({ theme }) => `${theme.fontSizes.text - 8}px`};
  font-family: monospace;
  color: #4a5568;
`;
