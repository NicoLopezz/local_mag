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
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
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

  const handleAddExampleProduct = () => {
    if (onAddProduct) {
      onAddProduct({
        id: "1",
        title: "Coca-Cola 500ml",
        description: "Refresco de cola",
        imageUrl: "/images/products/coca-cola.png",
        quantity: 1,
        price: 1.5,
      });
    }
  };

  const handleClickItem = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <PedidoItemContainer
      $status={status}
      onClick={handleClickItem}
      style={{ cursor: "pointer" }}
      $isSelected={$isSelected}
    >
      <OrderHeader>
        <WhatsappIconWrapper>
          <Whatsapp_Icon />
        </WhatsappIconWrapper>
        <PedidoTime $status={status}>{time}</PedidoTime>
        <ClienteName $status={status}>{clienteName}</ClienteName>
        <Progress_Bar status={status} progress={progress} />
        <ProductCount $status={status}>{status.replace("_", " ")}</ProductCount>
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
  padding: 0.75rem;
  background: ${({ $isSelected }) =>
    $isSelected
      ? "linear-gradient(to right, #d7d4d42a, #fefefe98)"
      : "white"};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $isSelected }) =>
      $isSelected
    ? "linear-gradient(to right, #abaaaa2a, #fefefe98)"
    : "#f8f9fa"};
  }
`;


const WhatsappIconWrapper = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    /* transform: scale(1.2); */
    /* color: #25d366;
  } */

  /* svg {
    width: 24px;
    height: 24px;
  } */
`; 


const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  gap: 12px;
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

const PedidoTime = styled.span<{ $status: string }>`
  color: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? "#434343" : "#000000"};
  font-size: 0.8rem;
  min-width: 40px;
  font-style: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? "italic" : "normal"};
  opacity: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? 0.6 : 1};
`;

const ClienteName = styled.span<{ $status: string }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? "#434343" : "#000000"};
  font-style: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? "italic" : "normal"};
  opacity: ${({ $status }) =>
    $status === "entregado" || $status === "cancelado" ? 0.6 : 1};
`;

const ProductCount = styled.span<{
  $status: "pendiente" | "en_camino" | "entregado" | "cancelado";
}>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  /* font-weight: bold; */
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #000;
  background-color: #ffffff;
  border: 1.5px solid
    ${({ $status }) => {
      switch ($status) {
        case "pendiente":
          return "#ffc107";
        case "en_camino":
          return "#007bff";
        case "entregado":
          return "#28a745";
        case "cancelado":
          return "#dc3545";
        default:
          return "#000000";
      }
    }};
`;
