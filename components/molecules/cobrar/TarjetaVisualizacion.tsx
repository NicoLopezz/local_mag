import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  numeroTarjeta: string;
  vencimiento: string;
  nombreApellido: string;
  tipoTarjeta: "visa" | "mastercard" | "amex" | "otro" | null;
}

const getMascaraNumero = (numero: string) => {
  const cleaned = numero.replace(/\D/g, "");
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.substring(i, i + 4));
  }
  return parts
    .map((part, index, array) => (index < array.length - 1 ? "••••" : part))
    .join(" ");
};

export const TarjetaVisualizacion: FC<Props> = ({
  numeroTarjeta,
  vencimiento,
  nombreApellido,
  tipoTarjeta,
}) => {
  const mascaraNumero = getMascaraNumero(numeroTarjeta);

  return (
    <ContenedorTarjeta tipo={tipoTarjeta}>
      <Chip />
      <TipoTarjetaIconWrapper>
        {tipoTarjeta === "visa" && (
          <img src="/images/visa.svg" alt="Visa" width="100" height="80" />
        )}
        {tipoTarjeta === "mastercard" && (
          <img
            src="/images/master.svg"
            alt="Mastercard"
            width="80"
            height="60"
          />
        )}
        {tipoTarjeta === "amex" && (
          <img
            src="/images/amex.svg"
            alt="American Express"
            width="120"
            height="75"
          />
        )}
      </TipoTarjetaIconWrapper>
      <NumeroTarjeta>{mascaraNumero}</NumeroTarjeta>
      <DetallesTarjeta>
        <NombreTarjeta>{nombreApellido.toUpperCase()}</NombreTarjeta>
        <VencimientoTarjeta>Vencimiento {vencimiento}</VencimientoTarjeta>
      </DetallesTarjeta>
    </ContenedorTarjeta>
  );
};

const ContenedorTarjeta = styled.div<{ tipo: Props["tipoTarjeta"] | null }>`
  background: linear-gradient(135deg, #f0f0f0 0%, #dcdcdc 100%);
  margin-top: 1rem;
  border-radius: 8px;
  padding: 1.5rem;
  width: 320px;
  height: 150px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  @media (max-width: 1440px) {
    /* width: 320px;
    height: 150px; */
    scale: 0.8;
  }
`;

const Chip = styled.div`
  width: 40px;
  height: 30px;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #d4af37 0%, #ffc125 100%);
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 6px 8px;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 4px;
    width: 12px;
    height: 4px;
    background-color: #f0e68c;
    border-radius: 1px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 4px;
    width: 12px;
    height: 4px;
    background-color: #f0e68c;
    border-radius: 1px;
  }

  & > span {
    background-color: #f0e68c;
    border-radius: 1px;
    height: 4px;
    width: 12px;
  }

  & > span:nth-child(1) {
    margin-top: 0;
  }

  & > span:nth-child(2) {
    align-self: flex-end;
  }

  & > span:nth-child(3) {
    align-self: flex-start;
  }
`;

const TipoTarjetaIconWrapper = styled.div`
  width: 40px;
  height: 30px;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumeroTarjeta = styled.div`
  font-size: 1.2rem;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2rem;
  color: #050825;
  font-family: "Courier New", monospace;
  font-weight: bold;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 2px 1px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(255, 215, 0, 0.2);
  background: linear-gradient(
    to bottom,
    #e0e0e0 0%,
    #b0bec5 30%,
    #2b2c2d 50%,
    #b0bec5 70%,
    #e0e0e0 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding: 0.2rem 0.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    pointer-events: none;
  }
`;
const DetallesTarjeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 1rem;
  font-size: 0.75rem;
  color: #202020;
`;

const NombreTarjeta = styled.div`
  text-transform: uppercase;
`;

const VencimientoTarjeta = styled.div``;
