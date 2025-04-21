import styled from "styled-components";
import { useEffect, useState } from "react";
import { Pedido_Item } from "@/components/molecules/pedidos/Pedido_Item";
import { Add_Pedido_Item } from "@/components/molecules/pedidos/Add_Pedido_Item";
import { usePedidos } from "@/context/Pedidos_Contex";
import { useToast } from "@/context/Toast_Context";

interface PedidoBoardProps {
  activeTab?: "day" | "week" | "month" | "year";
  date?: Date;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const Pedidos_Board = ({
  activeTab = "day",
  date = new Date(),
}: PedidoBoardProps) => {
  const { pedidos, agregarProductoAPedido, crearNuevoPedido } = usePedidos();
  const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null);
  

  // Calculate order statistics
  const totalPedidos = pedidos.length;
  const pedidosAbiertos = pedidos.filter((p) => p.status === "abierto").length;
  const pedidosCerrados = pedidos.filter(
    (p) => p.status === "cancelado"
  ).length;

  const { showToast } = useToast();
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const handleAddPedido = () => setPedidoModalOpen(true);
  const handleClosePedidoModal = () => setPedidoModalOpen(false);
  const handleProductSubmit = () => {
    setPedidoModalOpen(false);
    showToast("Producto creado con éxito");
  };

  // const handleAddPedido = () => {
  //   crearNuevoPedido({
  //     proveedorName: "Nuevo Proveedor"
  //   });
  // };

  const handlePedidoClick = (pedidoId: string) => {
    setSelectedPedidoId(pedidoId);
  };

  const selectedPedido = pedidos.find((p) => p.id === selectedPedidoId);

  return (
    <BoardWrapper>
      <PageTitle>PEDIDOS</PageTitle>

      <TabContainer>
        <TabItem $active={activeTab === "day"}>Día</TabItem>
        <TabItem $active={activeTab === "week"}>Semana</TabItem>
        <TabItem $active={activeTab === "month"}>Mes</TabItem>
        <TabItem $active={activeTab === "year"}>Año</TabItem>
      </TabContainer>

      <CurrentDate>{formatDate(date)}</CurrentDate>

      <ContentContainer>
        <ColumnsWrapper>
          <Column>
            <ColumnHeader>LISTA DE PEDIDOS</ColumnHeader>
            <PedidosList>
              {pedidos.map((pedido) => (
                <Pedido_Item
                  key={pedido.id}
                  time={pedido.time}
                  status={pedido.status}
                  proveedorName={pedido.proveedorName}
                  productos={pedido.productos}
                  onClick={() => handlePedidoClick(pedido.id)}
                  onAddProduct={(product) =>
                    agregarProductoAPedido(pedido.id, product)
                  }
                />
              ))}
              <AddButton onClick={handleAddPedido}>+ Añadir Pedido</AddButton>
            </PedidosList>
             
            {pedidoModalOpen && (
              
                <Add_Pedido_Item
                  onClose={handleClosePedidoModal}
                  onSubmit={handleProductSubmit}
                />
              
            )}
          </Column>

          <Column>
            <ColumnHeader>DETALLE</ColumnHeader>
            <DetailContent>
              {selectedPedido ? (
                <>
                  <h3>Pedido #{selectedPedido.id}</h3>
                  <p>Proveedor: {selectedPedido.proveedorName}</p>
                  <p>Estado: {selectedPedido.status}</p>
                  <p>Hora: {selectedPedido.time}</p>
                  <h4>Productos:</h4>
                  <ul>
                    {selectedPedido.productos.map((producto) => (
                      <li key={producto.id}>
                        {producto.title} - Cantidad: {producto.quantity}
                      </li>
                    ))}
                  </ul>
                  {selectedPedido.productos.length > 0 && (
                    <p>
                      <strong>Total: </strong>
                    </p>
                  )}
                </>
              ) : (
                <p>Seleccione un pedido para ver los detalles</p>
              )}
            </DetailContent>
          </Column>
        </ColumnsWrapper>

        <StatsColumn>
          <ColumnHeader>ESTADÍSTICAS</ColumnHeader>
          <StatsContent>
            <StatsRow>
              <span>Total Pedidos:</span>
              <span>{totalPedidos}</span>
            </StatsRow>
            <StatsRow>
              <span>Abiertos:</span>
              <span>{pedidosAbiertos}</span>
            </StatsRow>
            <StatsRow $highlight>
              <span>Cerrados:</span>
              <span>{pedidosCerrados}</span>
            </StatsRow>
          </StatsContent>
        </StatsColumn>
      </ContentContainer>
    </BoardWrapper>
  );
};

// Styled Components
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #161616;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AddButton = styled.button`
  background: #000;
  margin-top: 2%;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  width: 25%;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TabItem = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active }) => ($active ? "#111111" : "#e0e0e0")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const CurrentDate = styled.div`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  overflow: hidden;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  flex: 2;
  gap: 1rem;
`;

const Column = styled.div`
  flex: 1;
  min-width: 250px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  padding: 1rem;
  background: #222222eb;
  color: white;
  font-weight: 600;
  text-align: center;
`;

const PedidosList = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const DetailContent = styled.div`
  flex: 1;
  padding: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7f8c8d;
`;

const StatsColumn = styled.div`
  flex: 1;
  max-width: 300px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const StatsContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatsRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  font-weight: ${({ $highlight }) => ($highlight ? "bold" : "normal")};
  background: ${({ $highlight }) => ($highlight ? "#f8f9fa" : "transparent")};

  &:last-child {
    border-bottom: none;
  }
`;
