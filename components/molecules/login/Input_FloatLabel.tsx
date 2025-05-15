import styled from "styled-components";
import { FC, useState, useId, useEffect } from "react";

interface Props {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
  validateMatch?: {
    compareWith: string;
    errorMessage: string;
  };
}

export const Input_FloatLabel: FC<Props> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  validateMatch,
}) => {
  const [focused, setFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputId = useId();
  const isActive = focused || value.length > 0;

  useEffect(() => {
    if (validateMatch) {
      const { compareWith, errorMessage } = validateMatch;

      if (value === "" || compareWith === "") {
        setLocalError(null);
        return;
      }

      const matches = value === compareWith;
      setLocalError(matches ? null : errorMessage);
    }
  }, [value, validateMatch]);

  const finalError = error || localError;

  return (
    <Wrapper>
      <StyledInput
        id={inputId}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        $hasError={!!finalError}
      />
      <StyledLabel
        htmlFor={inputId}
        $active={isActive}
        $hasError={!!finalError}
      >
        {label}
      </StyledLabel>
      {finalError && <ErrorText> {finalError}</ErrorText>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 90%;
  padding: 1.2rem 1rem 0.6rem 1rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#00000024")};
  border-radius: 8px;
  background: transparent;
  color: black;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? "red" : theme.colors.toggleOff};
  }
`;

const StyledLabel = styled.label<{ $active: boolean; $hasError: boolean }>`
  position: absolute;
  top: ${({ $active }) => ($active ? "-0.4rem" : "1.1rem")};
  left: 1rem;
  font-size: ${({ $active }) => ($active ? "0.9rem" : "1rem")};
  color: ${({ $hasError }) => ($hasError ? "red" : "#0000008d")};
  background: ${({ theme }) => theme.colors.contenedores};
  padding: 0 0.25rem;
  transition: all 0.2s ease;
  pointer-events: none;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.3rem;
`;
