import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Envio_Item } from "@/components/molecules/envios/Envio_Item";
import { Empleado_Detail } from "../../organisms/modals_details/empleados/Empleados_Detail";
import { Add_Envio_Item } from "@/components/molecules/envios/Add_Envio_Item";
import { useEnvios } from "@/context/Envios_Context";
import { useToast } from "@/context/Toast_Context";
import { Ubicacion_Icon } from "@/components/atoms/icons/envios_icons/Ubicacion_Icon";
import { Cliente_Icon } from "@/components/atoms/icons/envios_icons/Cliente_Icon";
import { Clock_Icon } from "@/components/atoms/icons/envios_icons/Clock_Icon";
import { Filter_Icon } from "@/components/atoms/icons/envios_icons/Filter_Icon";
import { Cancel_Icon } from "@/components/atoms/icons/envios_icons/Cancel_Icon";
import { Check_Icon } from "@/components/atoms/icons/envios_icons/Check_Icon";
import { Pencil_Icon } from "@/components/atoms/icons/tasks_icons/Pencil_Icon";
import { useLang } from "@/context/Language_Context";

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

export const Envios_Board = ({
  activeTab = "day",
  date = new Date(),
}: PedidoBoardProps) => {
  const {
    envios,
    agregarProductoAEnvio,
    crearNuevoEnvio,
    setEnvioSeleccionadoId,
  } = useEnvios();
  const totalPedidos = envios.length;
  const pedidosAbiertos = envios.filter((p) => p.status === "en_camino").length;
  const pedidosCerrados = envios.filter((p) => p.status === "cancelado").length;

  const { showToast } = useToast();
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const handleAddPedido = () => setPedidoModalOpen(true);
  const handleClosePedidoModal = () => setPedidoModalOpen(false);

  //modales
  const [empleadoModalOpen, setEmpleadoModalOpen] = useState(false);
  const [selectedEmpleadoName, setSelectedEmpleadoName] = useState<
    string | null
  >(null);

  const { t } = useLang();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModalEmpleado = (name: string) => {
    setSelectedEmpleadoName(name);
    console.log(name);
    setEmpleadoModalOpen(true);
  };

  const handleCloseModalEmpleado = () => {
    setEmpleadoModalOpen(false);
    setSelectedEmpleadoName(null);
  };

  const handleEnvioSubmit = (envioData: {
    clienteName: string;
    direccion: string;
    status: "pendiente" | "en_camino" | "entregando" | "cancelado";
    time?: string;
  }) => {
    crearNuevoEnvio({
      clienteName: envioData.clienteName,
      direccion: envioData.direccion,
      status: envioData.status,
      productos: [],
      progress: "25",
    });
    showToast("Envío creado con éxito");
  };

  const handlePedidoClick = (pedidoId: string) => {
    const pedidoSeleccionado = envios.find((pedido) => pedido.id === pedidoId);
    if (pedidoSeleccionado) {
      console.log("Detalles del pedido:", pedidoSeleccionado);
      setEnvioSeleccionadoId(pedidoId);
    } else {
      console.log("No se encontró el pedido con ID:", pedidoId);
      setEnvioSeleccionadoId(null);
    }
  };

  const filterRef = useRef<HTMLDivElement>(null);
  const { envioSeleccionadoId } = useEnvios();
  const selectedEnvio = envios.find((p) => p.id === envioSeleccionadoId);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "pendiente" | "en_camino" | "entregando" | "cancelado" | null
  >(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowStatusFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [editedCliente, setEditedCliente] = useState("");
  const [editedSalida, setEditedSalida] = useState("");
  const [editedLlegada, setEditedLlegada] = useState("");
  const [editedDestino, setEditedDestino] = useState("");
  const [editedRepartidor, setEditedRepartidor] = useState("");
  const [editedMovil, setEditedMovil] = useState("");

  const repartidoresMock = [
    "Ricardo Díaz",
    "Laura Gómez",
    "Carlos Pérez",
    "Sofía Martínez",
    "Juan Fernández",
  ];

  const movilesMock = ["Movil 1", "Movil 2", "Movil 3", "Movil 4", "Movil 5"];

  const handleGuardarCambios = () => {
    if (selectedEnvio) {
      console.log("Guardando cambios...");

      console.log({
        cliente: editedCliente,
        salida: editedSalida,
        llegada: editedLlegada,
        destino: editedDestino,
        repartidor: editedRepartidor,
        movil: editedMovil,
      });
      setIsEditing(false);
      showToast("Cambios guardados exitosamente");
    }
  };

  const handleStartEditing = () => {
    if (selectedEnvio) {
      setEditedCliente(selectedEnvio.clienteName);
      setEditedSalida(selectedEnvio.time);
      setEditedLlegada(selectedEnvio.time);
      setEditedDestino(selectedEnvio.direccion);
      setEditedRepartidor("Ricardo Díaz");
      setEditedMovil("Movil 1");

      setIsEditing(true);
    }
  };

  const handleCancelarEdicion = () => {
    setIsEditing(false);
  };

  return (
    <BoardWrapper>
      <Wrapper>
        <PageTitle>{t.shipments.pageTitle}</PageTitle>
        <AddButton onClick={handleAddPedido}>
          {t.shipments.newShipment}
        </AddButton>
      </Wrapper>
      <Divider />
      <TabContainer>
        <TabItem $active={activeTab === "day"}>{t.shipments.tabs.day}</TabItem>
        <TabItem $active={activeTab === "week"}>
          {t.shipments.tabs.week}
        </TabItem>
        <TabItem $active={activeTab === "month"}>
          {t.shipments.tabs.month}
        </TabItem>
        <TabItem $active={activeTab === "year"}>
          {t.shipments.tabs.year}
        </TabItem>
      </TabContainer>

      <CurrentDate>{formatDate(date)}</CurrentDate>

      <ContentContainer>
        <ColumnsWrapper>
          <Column>
            <ColumnHeaderWrapper>
              <ColumnHeader>{t.shipments.listTitle}</ColumnHeader>

              {statusFilter && (
                <ActiveFilter>
                  <span>
                    {t.shipments.filteredBy}{" "}
                    {t.shipments.filterStatuses[statusFilter]}
                  </span>
                  <RemoveFilterButton onClick={() => setStatusFilter(null)}>
                    ✖
                  </RemoveFilterButton>
                </ActiveFilter>
              )}

              <FilterButton
                onClick={() => setShowStatusFilter((prev) => !prev)}
              >
                <Filter_Icon />
              </FilterButton>

              {showStatusFilter && (
                <StatusFilterContainer ref={filterRef}>
                  {["pendiente", "en_camino", "entregando", "cancelado"].map(
                    (status) => (
                      <StatusOption
                        key={status}
                        $isActive={statusFilter === status}
                        onClick={() => {
                          setStatusFilter(status as any);
                          setShowStatusFilter(false);
                        }}
                      >
                        {status.replace("_", " ")}
                      </StatusOption>
                    )
                  )}
                </StatusFilterContainer>
              )}
            </ColumnHeaderWrapper>

            <PedidosList>
              {envios
                .filter(
                  (pedido) => !statusFilter || pedido.status === statusFilter
                )
                .slice()
                .sort((a, b) => {
                  const estadoOrden = {
                    en_camino: 0,
                    pendiente: 1,
                    entregando: 2,
                    cancelado: 3,
                  };

                  const estadoA = estadoOrden[a.status];
                  const estadoB = estadoOrden[b.status];

                  if (estadoA !== estadoB) return estadoA - estadoB;

                  const [horaA, minutoA] = a.time.split(":").map(Number);
                  const [horaB, minutoB] = b.time.split(":").map(Number);

                  const fechaA = new Date();
                  fechaA.setHours(horaA, minutoA, 0, 0);

                  const fechaB = new Date();
                  fechaB.setHours(horaB, minutoB, 0, 0);

                  return fechaA.getTime() - fechaB.getTime();
                })
                .map((pedido) => (
                  <Envio_Item
                    key={pedido.id}
                    time={pedido.time}
                    status={pedido.status}
                    clienteName={pedido.clienteName}
                    direccion={pedido.direccion}
                    productos={pedido.productos}
                    onClick={() => handlePedidoClick(pedido.id)}
                    id={pedido.id}
                    $isSelected={pedido.id === envioSeleccionadoId}
                    progress={pedido.progress}
                  />
                ))}
            </PedidosList>

            {pedidoModalOpen && (
              <Add_Envio_Item
                onClose={handleClosePedidoModal}
                onSubmit={handleEnvioSubmit}
              />
            )}

            {empleadoModalOpen && (
              <Empleado_Detail
                onClose={handleCloseModalEmpleado}
                employeeName={selectedEmpleadoName}
              />
            )}
          </Column>

          <Column>
            <ColumnHeaderWrapper>
              <ColumnHeader>{t.shipments.details}</ColumnHeader>
              {!isEditing && (
                <EditButton onClick={handleStartEditing}>
                  <Pencil_Icon />
                </EditButton>
              )}
              {isEditing && (
                <EditActions>
                  <IconButton onClick={handleGuardarCambios}>
                    <Check_Icon />
                  </IconButton>
                  <IconButton onClick={handleCancelarEdicion}>
                    <Cancel_Icon />
                  </IconButton>
                </EditActions>
              )}
            </ColumnHeaderWrapper>

            <DetailContent>
              {selectedEnvio ? (
                <PedidoDetails>
                  <DetailHeader>
                    <LeftWrapper>
                      <Header_Detail_Wrapper>
                        <Status $status={selectedEnvio.status}>
                          {t.shipments.filterStatuses[selectedEnvio.status]}
                        </Status>
                        <OrderId>
                          {t.shipments.orderId} #{selectedEnvio.id}
                        </OrderId>
                      </Header_Detail_Wrapper>
                    </LeftWrapper>
                    <FinalizarButton
                      disabled={selectedEnvio.status !== "en_camino"}
                    >
                      {t.shipments.finalize}
                    </FinalizarButton>
                  </DetailHeader>

                  <DetailInfo>
                    <InfoItem>
                      <InfoLabel>{t.shipments.client}:</InfoLabel>
                      <Wrapper_Icon>
                        <Cliente_Icon />
                        <InfoValue>{selectedEnvio.clienteName}</InfoValue>
                      </Wrapper_Icon>
                    </InfoItem>

                    <InfoItem>
                      <TimeLabel>{t.shipments.departure}:</TimeLabel>
                      <WrapperIcon_Time>
                        <Clock_Icon />
                        <WrapperInfo_Time>
                          <TimeText>{selectedEnvio.time}</TimeText>
                          <TimeSeparator>-</TimeSeparator>
                          <TimeLabel>{t.shipments.arrival}:</TimeLabel>
                          <TimeText>
                            {selectedEnvio.status === "entregando"
                              ? selectedEnvio.time
                              : t.shipments.filterStatuses[
                                  selectedEnvio.status
                                ]}
                          </TimeText>
                        </WrapperInfo_Time>
                      </WrapperIcon_Time>
                    </InfoItem>

                    <InfoItem>
                      <InfoLabel>{t.shipments.destination}:</InfoLabel>
                      <Wrapper_Icon>
                        <Ubicacion_Icon />
                        <InfoValue>{selectedEnvio.direccion}</InfoValue>
                      </Wrapper_Icon>
                    </InfoItem>

                    <InfoItem>
                      <InfoLabel>{t.shipments.deliveryMan}:</InfoLabel>
                      <InfoValue>
                        {isEditing ? (
                          <StyledSelect
                            value={editedRepartidor}
                            onChange={(e) =>
                              setEditedRepartidor(e.target.value)
                            }
                          >
                            {repartidoresMock.map((rep) => (
                              <option key={rep} value={rep}>
                                {rep}
                              </option>
                            ))}
                          </StyledSelect>
                        ) : (
                          <>
                            {editedMovil || "Movil 1"} -{" "}
                            <RepartidorLink
                              onClick={() =>
                                handleOpenModalEmpleado(
                                  editedRepartidor || "Ricardo Díaz"
                                )
                              }
                            >
                              {editedRepartidor || "Ricardo Díaz"}
                            </RepartidorLink>
                          </>
                        )}
                      </InfoValue>
                    </InfoItem>
                  </DetailInfo>

                  <SectionTitle>{t.shipments.products}</SectionTitle>
                  {selectedEnvio.productos.length > 0 ? (
                    <ProductList>
                      {selectedEnvio.productos.map((producto) => (
                        <ProductItem key={producto.id}>
                          <ProductName>{producto.title}</ProductName>
                          <ProductQuantity>
                            {t.shipments.quantity}: {producto.quantity}
                          </ProductQuantity>
                        </ProductItem>
                      ))}
                    </ProductList>
                  ) : (
                    <NoProducts>{t.shipments.noProducts}</NoProducts>
                  )}

                  {selectedEnvio.productos.length > 0 && (
                    <TotalInfo>
                      <TotalLabel>{t.shipments.total}:</TotalLabel>
                      <TotalValue>
                        $
                        {selectedEnvio.productos
                          .reduce(
                            (sum, product) =>
                              sum + (product.price || 0) * product.quantity,
                            0
                          )
                          .toFixed(2)}
                      </TotalValue>
                    </TotalInfo>
                  )}
                </PedidoDetails>
              ) : (
                <EmptyState>{t.shipments.selectShipment}</EmptyState>
              )}
            </DetailContent>
          </Column>
        </ColumnsWrapper>

        <StatsColumn>
          <ColumnHeader2>{t.shipments.stats.title}</ColumnHeader2>
          <StatsContent>
            <StatsRow>
              <span>{t.shipments.stats.total}:</span>
              <span>{totalPedidos}</span>
            </StatsRow>
            <StatsRow>
              <span>{t.shipments.stats.open}:</span>
              <span>{pedidosAbiertos}</span>
            </StatsRow>
            <StatsRow $highlight>
              <span>{t.shipments.stats.closed}:</span>
              <span>{pedidosCerrados}</span>
            </StatsRow>
          </StatsContent>
        </StatsColumn>
      </ContentContainer>
    </BoardWrapper>
  );
};

const ColumnHeader2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.contenedores};
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  width: 50%;
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e1e1e15a;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const StyledSelect = styled.select`
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  padding: 4px 6px;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  width: 100%;
  outline: none;
  appearance: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4caf50;
    color: #222;
  }
`;

const PedidosList = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  font-size: 10px;
  cursor: pointer;
  color: #000000;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.5);
  }
  align-items: center;
  justify-items: center;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.title * 1.2}px;
  color: ${({ theme }) => theme.colors.title};
  cursor: pointer;
  margin-left: 1rem;
`;

const EditActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  cursor: pointer;
  transition: transform 0.2s ease;
`;

const ColumnHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  gap: 1rem;
  padding-right: 1rem;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StatusFilterContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeSlideDown 0.25s ease forwards;
  opacity: 0;
  transform: translateY(-5px);

  @keyframes fadeSlideDown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatusOption = styled.div<{ $isActive: boolean }>`
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  background: ${({ $isActive }) => ($isActive ? "black" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "white" : "#333")};
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: black;
    color: white;
  }
`;

const ClearFilterButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.02);
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.title * 0.8}px;
  margin: 0 0 1rem 0;
  margin-top: 1rem;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #cccccc16;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const WrapperIcon_Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WrapperInfo_Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimeLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
`;

const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
`;

const TimeSeparator = styled.span`
  margin: 0 0.25rem;
  color: ${({ theme }) => theme.colors.title};
`;

const RepartidorLink = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: transparent;
  transition: all 0.2s ease;

  &:hover {
    text-decoration-color: currentColor;
  }
`;

const MapLink = styled.a`
  margin-left: 8px;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper_Icon = styled.div`
  display: flex;
  align-content: center;
  justify-content: left;
  gap: 10px;
`;

const FinalizarButton = styled.button`
  background-color: ${({ disabled, theme }) =>
    disabled ? "#f9f9f99" : theme.colors.button};
  color: ${({ disabled }) => (disabled ? "#a0a0a0" : "white")};
  font-size: ${({ theme }) => theme.fontSizes.text}px;

  padding: 0.5rem 1rem;
  border: 1px solid ${({ disabled }) => (disabled ? "#ddd" : "#333")};
  border-radius: 8px;
  font-weight: 400;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease,
    border 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#f9f9f9" : "#f0f0f0")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 2px 8px rgba(0, 0, 0, 0.06)"};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.97)")};
  }
`;

const Header_Detail_Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const AddButton = styled.button`
  color: ${({ disabled }) => (disabled ? "#a0a0a0" : "white")};
  font-size: ${({ theme }) => theme.fontSizes.text}px;

  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 400;
  cursor: pointer;
  width: 7%;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
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
  background: ${({ theme }) => theme.colors.contenedores};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.h2`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.subtitle * 1.2}px;
  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.contenedores};
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`;

const DetailContent = styled.div`
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contenedores};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`;

const StatsColumn = styled.div`
  flex: 1;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const StatsContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatsRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.colors.subtitle};
  border-bottom: 1px solid #eee;
  font-weight: ${({ $highlight }) => ($highlight ? "bold" : "normal")};
  /* background: ${({ $highlight }) =>
    $highlight ? "#f8f9fa" : "transparent"}; */
  &:last-child {
    border-bottom: none;
  }
`;

const PedidoDetails = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.contenedores};
  border-radius: 8px;
  width: 90%;
  height: 36rem;
  animation: fadeSlideIn 0.4s ease forwards;
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const OrderId = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  margin: 0;
`;

const Status = styled.span<{
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
    $isSelected ? "#000000" : theme.colors.text};
`;

const DetailInfo = styled.div`
  margin-block-end: 1rem;
  display: grid;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  margin-top: 0.3rem;
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
`;

const InfoLabel = styled.strong`
  width: auto;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
  margin-right: 0.5rem;
  align-content: center;
`;

const InfoValue = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.title};
  align-items: center;
  gap: 0.5rem;
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
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
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
`;

const Wrapper_Time = styled.span`
  display: flex;
  font-weight: 500;
  color: #212529;
  gap: 0.5rem;
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
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  margin-right: 1rem;
`;

const TotalValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
`;

const EmptyState = styled.p`
  color: #6c757d;
  font-style: italic;
`;

const NoProducts = styled.p`
  color: #6c757d;
`;

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  justify-content: space-between;
`;
