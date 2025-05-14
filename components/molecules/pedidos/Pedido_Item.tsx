import styled from "styled-components";
import { useState } from "react";

interface Producto {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  quantity: number;
  price?: number;
}

interface PedidoItemProps {
  id: string; 
  time: string;
  status: "abierto" | "cerrado" | "cancelado";
  proveedorName: string;
  productos: Producto[];
  onAddProduct?: (product: Producto) => void;
  onRemoveProduct?: (productId: string) => void;
  onClick?: (pedidoId: string) => void; 
}

export const Pedido_Item = ({
  id, 
  time,
  status,
  proveedorName,
  productos,
  onAddProduct,
  onRemoveProduct,
  onClick,
}: PedidoItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleAddExampleProduct = () => {
    if (onAddProduct) {
      onAddProduct({
        id: "1",
        title: "Coca-Cola 500ml",
        description: "Refresco de cola",
        imageUrl: "/images/products/coca-cola.png",
        quantity: 1,
        price: 1.5
      });
    }
  };

  const handleClickItem = () => {
    setIsSelected(!isSelected);
    if (onClick) {
      onClick(id); 
    }
  };

  return (
    <PedidoItemContainer 
      $status={status} 
      onClick={handleClickItem} 
      $isSelected={isSelected}
    >
      <OrderHeader $isSelected={isSelected}>
        <PedidoTime>{time}</PedidoTime>
        <ProveedorName $status={status}>{proveedorName}</ProveedorName>
        <ProductCount>
          {productos.length} producto{productos.length !== 1 ? 's' : ''}
        </ProductCount>
      </OrderHeader>
      {showProducts && (
        <ProductList>
          {productos.map(producto => (
            <ProductItem key={producto.id}>
              {producto.title} - Cantidad: {producto.quantity}
            </ProductItem>
          ))}
        </ProductList>
      )}
    </PedidoItemContainer>
  );
};

interface PedidoItemContainerProps {
  $status: string;
  $isSelected: boolean;
}

const PedidoItemContainer = styled.div<PedidoItemContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ $isSelected, theme }) =>
  $isSelected ? theme.colors.icon : theme.colors.contenedores};
  border-radius: 8px;
  box-shadow: ${({ $isSelected }) => 
    $isSelected ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.1)'};
  border-left: 6px solid
    ${({ $status }) =>
      $status === "abierto" 
        ? "#27ae60" 
        : $status === "cancelado" 
        ? "#e74c3c" 
        : "#f39c12"};
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${({ $isSelected }) => $isSelected ? 'translateY(-2px)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

interface OrderHeaderProps {
  $isSelected: boolean;
}

const OrderHeader = styled.div<OrderHeaderProps>`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  gap: 12px;
  color: ${({ $isSelected }) => $isSelected ? '#2c3e50' : '#7f8c8d'};
  font-weight: ${({ $isSelected }) => $isSelected ? '600' : '400'};
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

const ProductList = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #ecf0f1;
  padding-top: 1rem;
`;

const PedidoTime = styled.span`
  color: inherit;
  font-size: 0.85rem;
  min-width: 40px;
`;

const ProveedorName = styled.span<{ $status: string }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: 
    ${({ $status }) =>
      $status === "cancelado" 
        ? "line-through" 
        : "none"};
  color: ${({ $status }) =>
    $status === "cancelado" 
      ? "#95a5a6" 
      : "inherit"};
`;

const ProductCount = styled.span`
  font-weight: bold;
  color: inherit;
  font-size: 0.9rem;
  min-width: 80px;
  text-align: right;
`;