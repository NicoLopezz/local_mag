import { FC } from "react";
import styled from "styled-components";
import { usePedidos } from "@/context/Pedidos_Context";

interface Props {}

export const Mail_Icon: FC<Props> = () => {
  const { pedidoSeleccionadoId, isPedidoAbierto } = usePedidos();

  const isPedidoAbiertoSeleccionado =
    pedidoSeleccionadoId && isPedidoAbierto(pedidoSeleccionadoId);
  const isDisabled = !!isPedidoAbiertoSeleccionado; 
  const tooltipText = isDisabled ? "Finalice el pedido para enviar" : "";

  return (
    <TooltipWrapper>
      <IconWrapper disabled={isDisabled} onClick={() => {
        if (!isDisabled) {
          console.log("Enviar correo del pedido:", pedidoSeleccionadoId);
        }
      }}>
        <Svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1.3em"
          width="1.3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path>
        </Svg>
        {isDisabled && <TooltipText>{tooltipText}</TooltipText>} 
      </IconWrapper>
    </TooltipWrapper>
  );
};

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 80px;
  background-color: #000000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: ${({ theme }) => theme.fontSizes.text}px;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const IconWrapper = styled.span<{ disabled?: boolean }>`
  display: inline-block;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  svg {
    color: ${props => (props.disabled ? "#888" : "currentColor")};
    fill: ${props => (props.disabled ? "#ccc" : "currentColor")};
  }

  &:hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;