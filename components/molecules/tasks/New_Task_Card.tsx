import { FC, useState } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";


interface Props {
  onAdd: (taskName: string, description?: string, code?: string) => void;
  onOpenModal: () => void;
}

export const New_Task_Card: FC<Props> = ({ onAdd, onOpenModal }) => {
  const { t } = useLang();

  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      onAdd(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleClear = () => setInput("");

  return (
    <Wrapper>
      <Form>
        <InputContainer>
          <Input
            placeholder={t.tasks.cardTitlePlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton onClick={input ? handleClear : handleAdd}>
            <IconWrapper $visible={input === ""}>
              <SvgIcon viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </SvgIcon>
            </IconWrapper>
            <IconWrapper $visible={input !== ""}>
              <SvgIcon viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </SvgIcon>
            </IconWrapper>
          </IconButton>
        </InputContainer>
        <Actions>
          <AddButton onClick={onOpenModal}>{t.tasks.addCard}</AddButton>
        </Actions>
      </Form>
    </Wrapper>
  );

};

const Wrapper = styled.div`
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  gap: 0.75rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid #00000071;
  border-radius: 8px;
  overflow: hidden;
  height: 30px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 0 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  height: 100%;
  outline: none;
  background-color: ${({ theme }) => theme.colors.background};
  &::placeholder {
    color: #9ca3af;
  }
`;

const IconButton = styled.button`
  width: 25px;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.contenedores};
    color: var(--dark-blue);
  }
`;

const IconWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.3)});
  transition: opacity 0.2s ease, transform 0.2s ease;
  background-color: ${({ $visible, theme }) =>
  $visible ? theme.colors.background : "transparent"};

`;

const SvgIcon = styled.svg`
  width: 15px;
  height: 15px;
  color: ${({ theme }) => theme.colors.title};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;
