import { FC } from "react";
import styled from "styled-components";

interface Props {
  activeLang: "es" | "en";
  onSelect: (lang: "es" | "en") => void;
}

export const Language_Switch: FC<Props> = ({ activeLang, onSelect }) => {
  return (
    <Container>
      <LangItem onClick={() => onSelect("es")}>
        Es
        <Indicator $active={activeLang === "es"} />
      </LangItem>
      <Separator>|</Separator>
      <LangItem onClick={() => onSelect("en")}>
        En
        <Indicator $active={activeLang === "en"} />
      </LangItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  font-weight: 100;
  margin-bottom: -2rem;
  margin-left: 1rem;
`;

const LangItem = styled.div`
  cursor: pointer;
  position: relative;
  padding: 4px 6px;
`;

const Separator = styled.span`
  padding: 0 2px;
`;

const Indicator = styled.div<{ $active: boolean }>`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.3s;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const localStyled = undefined;
