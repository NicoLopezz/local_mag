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
    time: string;
    status: "abierto" | "cerrado" | "cancelado";
    proveedorName: string;
    productos: Producto[];
    onAddProduct?: (product: Producto) => void;
    onRemoveProduct?: (productId: string) => void;
    onClick?: () => void;
  }

export const Pedido_Item = ({
    time,
    status,
    proveedorName,
    productos,
    onAddProduct,
    onRemoveProduct,
    onClick,
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
          price: 1.5
        });
      }
    };
  
    return (
      <PedidoItemContainer $status={status}>
        <OrderHeader onClick={() => setShowProducts(!showProducts)}>
          <PedidoTime>{time}</PedidoTime>
          <ProveedorName>{proveedorName}</ProveedorName>
          <ProductCount>
            {productos.length} producto{productos.length !== 1 ? 's' : ''}
          </ProductCount>
        </OrderHeader>
      </PedidoItemContainer>
    );
  };

const PedidoItemContainer = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid
    ${({ $status }) =>
      $status === "abierto" 
        ? "#27ae60" 
        : $status === "cancelado" 
        ? "#e74c3c" 
        : "#f39c12"};
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  gap: 12px;
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

const PedidoTime = styled.span`
  color: #7f8c8d;
  font-size: 0.8rem;
  min-width: 40px;
`;

const ProveedorName = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const ProductCount = styled.span`
  font-weight: bold;
  color: #1a1a1a;
  font-size: 0.9rem;
  min-width: 80px;
  text-align: right;
`;