import styled from "styled-components";
import { useState } from "react";
import { Progress_Bar } from "./Progress_Bar";
import { Whatsapp_Icon } from "@/components/atoms/icons/envios_icons/Whatsapp_Icon";

interface ProductoEnvio {
  price: number;
  id: string;
  title: string;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

interface PedidoItemProps {
  id: string;
  time: string;
  status: "pendiente" | "en_camino" | "entregando" | "cancelado";
  clienteName: string;
  direccion: string;
  productos: ProductoEnvio[];
  onAddProduct?: (product: ProductoEnvio) => void;
  onRemoveProduct?: (productId: string) => void;
  onClick?: (pedidoId: string) => void;
  $isSelected?: boolean;
  progress: "25" | "50" | "75" | "100";
}

export const Envio_Item = ({
  id,
  time,
  status,
  clienteName,
  productos,
  onAddProduct,
  onRemoveProduct,
  onClick,
  $isSelected,
  progress,
}: PedidoItemProps) => {
  const [showProducts, setShowProducts] = useState(false);

  const handleClickItem = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <PedidoItemContainer
      $status={status}
      onClick={handleClickItem}
      $isSelected={$isSelected}
    >
      <OrderHeader>
        <WhatsappIconWrapper>
          <Whatsapp_Icon />
        </WhatsappIconWrapper>
        <PedidoTime $status={status} $isSelected={$isSelected}>
          {time}
        </PedidoTime>
        <ClienteName $status={status} $isSelected={$isSelected}>
          {clienteName}
        </ClienteName>
        <Progress_Bar status={status} progress={progress} $isSelected={$isSelected} />
        <ProductCount $status={status} $isSelected={$isSelected}>
          {status.replace("_", " ")}
        </ProductCount>
      </OrderHeader>

      {showProducts && (
        <ProductList>
          {productos.map((producto) => (
            <ProductItem key={producto.id}>
              {producto.title} - Cantidad: {producto.quantity}
            </ProductItem>
          ))}
        </ProductList>
      )}
    </PedidoItemContainer>
  );
};

const PedidoItemContainer = styled.div<{
  $status: string;
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: ${({ $isSelected }) => $isSelected ? "scale(1.02)" : "scale(1)"};
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: ${({ $isSelected }) => $isSelected ? 1 : 0};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
    background: ${({ $isSelected, theme }) => 
      $isSelected ? theme.colors.icon : 'transparent'};
    border-radius: 0 8px 8px 0;
    transition: all 0.2s ease-in-out;
    ${({ $isSelected }) => $isSelected && `
      top: 8px;
      bottom: 8px;
    `}
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const WhatsappIconWrapper = styled.div``;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  gap: 12px;
`;

const PedidoTime = styled.span<{ $status: string; $isSelected?: boolean }>`
  color: ${({ $status, $isSelected, theme }) =>
    $status === "entregando" || $status === "cancelado"
      ? $isSelected
        ? "#000000"
        : "#434343"
      : $isSelected
      ? theme.colors.text
      : theme.colors.text};
  font-size: 0.8rem;
  min-width: 40px;
  font-style: ${({ $status }) =>
    $status === "entregando" || $status === "cancelado" ? "italic" : "normal"};
  opacity: ${({ $status, $isSelected }) =>
    $isSelected
      ? 1
      : $status === "entregando" || $status === "cancelado"
      ? 0.6
      : 1};
`;

const ClienteName = styled.span<{ $status: string; $isSelected?: boolean }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 500)};
  color: ${({ $status, $isSelected, theme }) =>
    $status === "entregando" || $status === "cancelado"
      ? $isSelected
        ? "#000000"
        : "#434343"
      : $isSelected
      ? theme.colors.text
      : theme.colors.text};
  font-style: ${({ $status }) =>
    $status === "entregando" || $status === "cancelado" ? "italic" : "normal"};
  opacity: ${({ $status, $isSelected }) =>
    $isSelected
      ? 1
      : $status === "entregando" || $status === "cancelado"
      ? 0.6
      : 1};
`;

const ProductCount = styled.span<{
  $status: "pendiente" | "en_camino" | "entregando" | "cancelado";
  $isSelected?: boolean;
}>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #000;
  background-color: rgba(255, 255, 255, 0.09);
  border: 1.5px solid
    ${({ $status }) => {
      switch ($status) {
        case "pendiente":
          return "#ffc107";
        case "en_camino":
          return "#007bff";
        case "entregando":
          return "#28a745";
        case "cancelado":
          return "#dc3545";
        default:
          return "#000000";
      }
    }};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.text : theme.colors.text};
`;

const ProductItem = styled.li`
  font-size: 0.9em;
  color: #333;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const AddButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #2980b9;
  }
`;

const ProductList = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #ecf0f1;
  padding-top: 1rem;
`;
