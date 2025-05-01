import styled from "styled-components";
import { useEffect, useState } from "react";
import { Pedido_Item } from "@/components/molecules/pedidos/Pedido_Item";
import { Add_Pedido_Item } from "@/components/molecules/pedidos/Add_Pedido_Item";
import { usePedidos } from "@/context/Pedidos_Context";
import { useToast } from "@/context/Toast_Context";
import { Mail_Icon } from "@/components/atoms/icons/finanzas_icons/Mail_Icon";

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
  const { pedidos, agregarProductoAPedido, crearNuevoPedido, setPedidoSeleccionadoId } = usePedidos();
  const totalPedidos = pedidos.length;
  const pedidosAbiertos = pedidos.filter((p) => p.status === "abierto").length;
  const pedidosCerrados = pedidos.filter(
    (p) => p.status === "cancelado"
  ).length;

  const { showToast } = useToast();
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const handleAddPedido = () => setPedidoModalOpen(true);
  const handleClosePedidoModal = () => setPedidoModalOpen(false);

  const handlePedidoSubmit = (pedidoData: {
    proveedorName: string;
    status: "abierto" | "cerrado" | "cancelado";
    time?: string;
  }) => {
    crearNuevoPedido({
      proveedorName: pedidoData.proveedorName,
      status: pedidoData.status,
      productos: [],
    });
    showToast("Pedido creado con éxito");
  };

  const handlePedidoClick = (pedidoId: string) => {
    const pedidoSeleccionado = pedidos.find((pedido) => pedido.id === pedidoId);
    if (pedidoSeleccionado) {
      console.log("Detalles del pedido:", pedidoSeleccionado);
      setPedidoSeleccionadoId(pedidoId); // Usamos la función del contexto
    } else {
      console.log("No se encontró el pedido con ID:", pedidoId);
      setPedidoSeleccionadoId(null); // Usamos la función del contexto
    }
  };

  const { pedidoSeleccionadoId } = usePedidos(); // Obtenemos el ID seleccionado del contexto
  const selectedPedido = pedidos.find((p) => p.id === pedidoSeleccionadoId);

  return (
    <BoardWrapper>
      <PageTitle>Pedidos</PageTitle>
      <Divider />
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
                  id={pedido.id}
                />
              ))}
              <AddButton onClick={handleAddPedido}>Añadir Pedido</AddButton>
            </PedidosList>

            {pedidoModalOpen && (
              <Add_Pedido_Item
                onClose={handleClosePedidoModal}
                onSubmit={handlePedidoSubmit}
              />
            )}
          </Column>

          <Column>
            <ColumnHeader>DETALLE</ColumnHeader>
            <DetailContent>
              {selectedPedido ? (
                <PedidoDetails>
                  <DetailHeader>
                    <OrderId>Pedido #{selectedPedido.id}</OrderId>
                    <Header_Detail_Wrapper>
                      <Status $status={selectedPedido.status}>
                        {selectedPedido.status.toUpperCase()}
                      </Status>
                      <Mail_Icon></Mail_Icon>
                    </Header_Detail_Wrapper>
                  </DetailHeader>

                  <DetailInfo>
                    <InfoItem>
                      <InfoLabel>Proveedor:</InfoLabel>
                      <InfoValue>{selectedPedido.proveedorName}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Hora:</InfoLabel>
                      <InfoValue>{selectedPedido.time}</InfoValue>
                    </InfoItem>
                  </DetailInfo>

                  <SectionTitle>Productos</SectionTitle>
                  {selectedPedido.productos.length > 0 ? (
                    <ProductList>
                      {selectedPedido.productos.map((producto) => (
                        <ProductItem key={producto.id}>
                          <ProductName>{producto.title}</ProductName>
                          <ProductQuantity>
                            Cantidad: {producto.quantity}
                          </ProductQuantity>
                        </ProductItem>
                      ))}
                    </ProductList>
                  ) : (
                    <NoProducts>
                      No se agregaron productos a este pedido.
                    </NoProducts>
                  )}

                  {selectedPedido.productos.length > 0 && (
                    <TotalInfo>
                      <TotalLabel>Total:</TotalLabel>
                      <TotalValue>
                        $
                        {selectedPedido.productos
                          .reduce(
                            (sum, product) =>
                              sum + (product.price || 0) * product.quantity,
                            0
                          )
                          .toFixed(2)}
                      </TotalValue>
                    </TotalInfo>
                  )}

                  <Finalizar_Wrapper>
                    <FinalizarButton
                      disabled={selectedPedido.status !== "abierto"}
                    >
                      Finalizar
                    </FinalizarButton>{" "}
                  </Finalizar_Wrapper>
                </PedidoDetails>
              ) : (
                <EmptyState>
                  Seleccione un pedido para ver los detalles
                </EmptyState>
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
  margin-top: 1rem;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin-top: 0.5rem; 
  margin-bottom: 1.5rem;
  width: 100%; 
`;

const Finalizar_Wrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 50px;
  gap: 20px;
`;

const FinalizarButton = styled.button`
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 400;
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "#000000")};
  color: ${(props) => (props.disabled ? "#a0a0a0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: auto;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;


const Header_Detail_Wrapper = styled.div`
display: flex;
align-items: center;
gap: 20px;
`

// const Mail_Icon = styled`
// color: red;
// `




const AddButton = styled.button`
  background: #000;
  margin-top: 2%;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 15px;
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
  position: relative;
  flex: 1;
  padding: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const PedidoDetails = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 90%;
  height: 100%;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const OrderId = styled.h3`
  font-size: 1.5rem;
  color: #343a40;
  margin: 0;
`;

const Status = styled.span<{ $status: "abierto" | "cerrado" | "cancelado" }>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: ${({ $status }) =>
    $status === "abierto"
      ? "#28a745"
      : $status === "cerrado"
      ? "#eaa606"
      : "#dc3545"};
  background-color: ${({ $status }) =>
    $status === "abierto"
      ? "#ffffff"
      : $status === "cerrado"
      ? "#ffffff"
      : "#ffffff"};
`;

const DetailInfo = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.strong`
  width: 90px;
  color: #495057;
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: #212529;
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  color: #343a40;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.span`
  font-weight: 500;
  color: #212529;
`;

const ProductQuantity = styled.span`
  color: #6c757d;
`;

const TotalInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TotalLabel = styled.strong`
  font-size: 1.1rem;
  color: #343a40;
  margin-right: 1rem;
`;

const TotalValue = styled.span`
  font-size: 1.1rem;
  color: #198754;
  font-weight: bold;
`;

const EmptyState = styled.p`
  color: #6c757d;
  font-style: italic;
`;

const NoProducts = styled.p`
  color: #6c757d;
`;
