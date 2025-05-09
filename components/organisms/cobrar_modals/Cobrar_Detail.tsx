import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { Cobrar_Base_Detail_Modal } from "@/components/organisms/cobrar_modals/Cobrar_Base_Detail_Modal";
import { mockData } from "@/mock_data/products";
import { TarjetaFormulario } from "@/components/molecules/cobrar/TarjetaFormulario";
import { TarjetaVisualizacion } from "@/components/molecules/cobrar/TarjetaVisualizacion";
import { QRCodeCanvas } from "qrcode.react";
import { Money_Icon } from "@/components/atoms/icons/cobrar_icons/Money_Icon";
import { Card_Icon } from "@/components/atoms/icons/cobrar_icons/Card_Icon";
import { Qr_Icon } from "@/components/atoms/icons/cobrar_icons/Qr_Icon";
import { useLang } from "@/context/Language_Context";
import { Divider } from "@/components/atoms/Divider";

interface Props {
  onClose: () => void;
}

export const Cobrar_Detail: FC<Props> = ({ onClose }) => {
  const { t } = useLang();
  const [activePaymentTab, setActivePaymentTab] = useState("Efectivo");
  const { query } = useRouter();
  const productCode =
    typeof query.productCode === "string" ? query.productCode : "";
  const producto = mockData.products.find((p) => p.productCode === productCode);
  const [cantidad, setCantidad] = useState(1);

  //FALTA EL PRECIO UNITARIO POR PRODUCTO.
  const totalAPagar = cantidad * (producto?.stock ?? 0);
  // const precioUnitario = 100;

  //

  const [pagoEfectivo, setPagoEfectivo] = useState<number | undefined>(
    undefined
  );
  const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
  const [vencimientoTarjeta, setVencimientoTarjeta] = useState<string>("");
  const [codSeguridadTarjeta, setCodSeguridadTarjeta] = useState<string>("");
  const [nombreApellidoTarjeta, setNombreApellidoTarjeta] =
    useState<string>("");
  const vueltoEfectivo =
    pagoEfectivo !== undefined ? pagoEfectivo - totalAPagar : undefined;

  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setCantidad(0);
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setCantidad(parsed);
    }
  };

  const [contadorActivo, setContadorActivo] = useState(false);
  const [contador, setContador] = useState<number | null>(null);

  useEffect(() => {
    if (contadorActivo && contador !== null && contador > 0) {
      const timer = setTimeout(() => {
        setContador(contador - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (contador === 0) {
      setContadorActivo(false);
      setContador(null);
      console.log("¡Cancelación automática!");
      setPagoEfectivo(undefined);
    }
  }, [contadorActivo, contador]);

  const activarContador = () => {
    if (!contadorActivo) {
      setContadorActivo(true);
      setContador(5);
    } else {
      setContador(5);
    }
  };

  const handlePagoEfectivoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagoEfectivo(
      isNaN(parseInt(event.target.value, 10))
        ? undefined
        : parseInt(event.target.value, 10)
    );
    activarContador();
  };

  const handleNumeroTarjetaChange = (value: string) => {
    setNumeroTarjeta(value);
  };

  const handleVencimientoTarjetaChange = (value: string) => {
    setVencimientoTarjeta(value);
  };

  const handleCodSeguridadTarjetaChange = (value: string) => {
    setCodSeguridadTarjeta(value);
  };

  const handleNombreApellidoTarjetaChange = (value: string) => {
    setNombreApellidoTarjeta(value);
  };

  const getTipoTarjeta = (numero: string) => {
    const cleaned = numero.replace(/\D/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5")) return "mastercard";
    if (cleaned.startsWith("34") || cleaned.startsWith("37")) return "amex";
    return null;
  };

  const getChangeStatus = (
    vuelto: number | undefined
  ): "positive" | "negative" | "exact" | "empty" => {
    if (vuelto === undefined || vuelto === null) return "empty";
    if (vuelto > 0) return "positive";
    if (vuelto < 0) return "negative";
    return "exact";
  };

  const tipoTarjeta = getTipoTarjeta(numeroTarjeta);

  function handleFinalizarPago(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    throw new Error("Function not implemented.");
  }

  const TABS = [
    { id: "cobrar", label: t.modals.productos.cobrar.tabs.cobrar },
    { id: "stock", label: t.modals.productos.cobrar.tabs.stock },
  ];

  const [activeTab, setActiveTab] = useState("cobrar");

  return (
    <Cobrar_Base_Detail_Modal
      tabs={TABS.map((tab) => tab.label)}
      activeTab={TABS.find((tab) => tab.id === activeTab)?.label || ""}
      onTabChange={(label) => {
        const selected = TABS.find((tab) => tab.label === label);
        if (selected) setActiveTab(selected.id);
      }}
      onClose={onClose}
      imageSlot={
        producto && (
          <Image
            src={producto.imageUrl}
            alt={producto.title}
            width={450}
            height={450}
            style={{ objectFit: "contain", margin: "1rem auto" }}
          />
        )
      }
    >
      <TabContentContainer active={activeTab === "cobrar"}>
        {activeTab === "cobrar" && (
          <CobrarSection>
            {producto && (
              <>
                <ProductInfo>
                  <span>{producto.title}</span>
                  <span>
                    {t.modals.productos.cobrar.precio}: ${producto.stock}
                  </span>
                </ProductInfo>
                <InputGroup>
                  <label htmlFor="cantidad">
                    {t.modals.productos.cobrar.cantidad}:
                  </label>
                  <input
                    type="number"
                    id="cantidad"
                    value={cantidad === 0 ? "" : cantidad}
                    onChange={handleCantidadChange}
                    min="1"
                  />
                </InputGroup>
                <TotalPagar>
                  <span>{t.modals.productos.cobrar.totalCobrar}:</span>
                  <span>${totalAPagar.toFixed(2)}</span>
                </TotalPagar>

                <PaymentMethodTabs>
                  <PaymentTab
                    className={
                      activePaymentTab === "Efectivo" ? "is-active" : ""
                    }
                    onClick={() => setActivePaymentTab("Efectivo")}
                  >
                    <PaymentTabContent>
                      <Money_Icon />
                      <span>{t.modals.productos.cobrar.metodos.efectivo}</span>
                    </PaymentTabContent>
                  </PaymentTab>

                  <PaymentTab
                    className={
                      activePaymentTab === "Tarjeta" ? "is-active" : ""
                    }
                    onClick={() => setActivePaymentTab("Tarjeta")}
                  >
                    <PaymentTabContent>
                      <Card_Icon />
                      <span>{t.modals.productos.cobrar.metodos.tarjeta}</span>
                    </PaymentTabContent>
                  </PaymentTab>

                  <PaymentTab
                    className={activePaymentTab === "QR" ? "is-active" : ""}
                    onClick={() => setActivePaymentTab("QR")}
                  >
                    <PaymentTabContent>
                      <Qr_Icon />
                      <span>{t.modals.productos.cobrar.metodos.qr}</span>
                    </PaymentTabContent>
                  </PaymentTab>
                </PaymentMethodTabs>

                <PaymentContentContainer
                  isActive={activePaymentTab === "Efectivo"}
                >
                  <PaymentDetails>
                    <PaymentOptions>
                      <PaymentLabel>
                        {t.modals.productos.cobrar.pagaCon}
                      </PaymentLabel>
                      <PaymentInput
                        type="number"
                        value={pagoEfectivo ?? ""}
                        onChange={handlePagoEfectivoChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />

                      <QuickPaymentButtons>
                        {[totalAPagar, totalAPagar * 1.5, totalAPagar * 2].map(
                          (amount) => (
                            <QuickButton
                              key={amount}
                              onClick={() => setPagoEfectivo(amount)}
                            >
                              ${amount.toFixed(2)}
                            </QuickButton>
                          )
                        )}
                        <PaymentActions>
                          <ActionButton
                            onClick={() => setPagoEfectivo(undefined)}
                            disabled={pagoEfectivo === null}
                          >
                            {t.modals.productos.cobrar.limpiar}
                          </ActionButton>
                        </PaymentActions>
                      </QuickPaymentButtons>
                    </PaymentOptions>

                    <PaymentResultContainer>
                      <PaymentSummary>
                        <SummaryRow>
                          <span>{t.modals.productos.cobrar.recibido}:</span>
                          <ReceivedAmount $hasValue={pagoEfectivo !== null}>
                            {pagoEfectivo !== null
                              ? `$${(pagoEfectivo ?? 0).toFixed(2)}`
                              : "-"}
                          </ReceivedAmount>
                        </SummaryRow>

                        <SummaryRow>
                          <span>{t.modals.productos.cobrar.total}:</span>
                          <span>${totalAPagar.toFixed(2)}</span>
                        </SummaryRow>

                        <Divider />

                        <SummaryRow>
                          <span>{t.modals.productos.cobrar.vuelto}:</span>
                          <ChangeAmount
                            $status={getChangeStatus(vueltoEfectivo)}
                          >
                            {pagoEfectivo !== null
                              ? (vueltoEfectivo ?? 0) > 0
                                ? `$${(vueltoEfectivo ?? 0).toFixed(2)}`
                                : (vueltoEfectivo ?? 0) < 0
                                ? `-$${Math.abs(vueltoEfectivo ?? 0).toFixed(
                                    2
                                  )}`
                                : t.modals.productos.cobrar.exacto
                              : "-"}
                          </ChangeAmount>
                        </SummaryRow>
                      </PaymentSummary>
                    </PaymentResultContainer>
                  </PaymentDetails>
                </PaymentContentContainer>

                <PaymentContentContainer
                  isActive={activePaymentTab === "Tarjeta"}
                >
                  <TarjetaSection>
                    <TarjetaFormulario
                      onNumeroTarjetaChange={handleNumeroTarjetaChange}
                      onVencimientoChange={handleVencimientoTarjetaChange}
                      onCodSeguridadChange={handleCodSeguridadTarjetaChange}
                      onNombreApellidoChange={handleNombreApellidoTarjetaChange}
                      numeroTarjeta={numeroTarjeta}
                      vencimiento={vencimientoTarjeta}
                      codSeguridad={codSeguridadTarjeta}
                      nombreApellido={nombreApellidoTarjeta}
                    />
                    <TarjetaVisualizacion
                      numeroTarjeta={numeroTarjeta}
                      vencimiento={vencimientoTarjeta}
                      nombreApellido={nombreApellidoTarjeta}
                      tipoTarjeta={tipoTarjeta}
                    />
                  </TarjetaSection>
                </PaymentContentContainer>

                <PaymentContentContainer isActive={activePaymentTab === "QR"}>
                  <PaymentDetails>
                    <QRCodeContainer>
                      <QRCodeCanvas
                        value={`https://tusitio.com/products/`}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                      />
                      <Title>{t.modals.productos.cobrar.escaneaQr}</Title>
                    </QRCodeContainer>
                  </PaymentDetails>
                </PaymentContentContainer>

                <Finalizar_Wrapper>
                  <FinalizarButton disabled={contadorActivo !== true}>
                    {t.modals.productos.cobrar.finalizar}
                    {contadorActivo !== true && (
                      <Tooltip>{t.modals.productos.cobrar.tooltip}</Tooltip>
                    )}
                  </FinalizarButton>
                  {contadorActivo && contador !== null && (
                    <ContadorCancelacion activo={contador <= 5}>
                      {t.modals.productos.cobrar.cancelacionAuto.replace(
                        "{seg}",
                        String(contador)
                      )}
                    </ContadorCancelacion>
                  )}
                </Finalizar_Wrapper>
              </>
            )}
          </CobrarSection>
        )}
      </TabContentContainer>
    </Cobrar_Base_Detail_Modal>
  );
};

const TarjetaSection = styled.div`
  display: flex;
  gap: 40px;
  margin-top: -1rem;
`;

const PagoJusto = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  margin-top: 0.5rem;
  color: #000;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 19px;
`;

const Finalizar_Wrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  left: 20px;
  gap: 20px;
`;

const ContadorCancelacion = styled.div<{ activo?: boolean }>`
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${(props) =>
    props.activo &&
    `
    background-color: #dc3545;
    color: #fff;
  `}
`;

const TabContentContainer = styled.div<{ active: boolean }>`
  overflow: hidden;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  transform: ${(props) => (props.active ? "scale(1)" : "scale(0.95)")};
  opacity: ${(props) => (props.active ? "1" : "0")};
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

const ReceivedAmount = styled.span<{ $hasValue: boolean }>`
  color: ${({ $hasValue }) => ($hasValue ? "#000" : "#999")};
  font-weight: ${({ $hasValue }) => ($hasValue ? "bold" : "normal")};
`;

const ChangeAmount = styled.span<{
  $status: "positive" | "negative" | "exact" | "empty";
}>`
  font-weight: bold;
  color: ${({ $status }) =>
    $status === "positive"
      ? "#28a745"
      : $status === "negative"
      ? "#dc3545"
      : $status === "exact"
      ? "#007bff"
      : "#999"};
`;

const CobrarSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.modal};
  border-radius: 16px;
  border: 1px solid #dddddd5f;
  height: 650px;
`;

const QuickPaymentButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuickButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: #e9e9e9;
  }
`;

const PaymentResultContainer = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const PaymentSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PagoExacto = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #28a745;
  font-weight: bold;
`;

const CheckIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #28a745;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
`;

const PaymentActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10rem;
  width: 10%;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 0.65rem;
  border: none;
  border-radius: 8px;
  background: ${({ primary }) => (primary ? "#4478b0" : "#00050a6b")};
  color: ${({ primary }) => (primary ? "white" : "#ffffff")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ primary }) => (primary ? "#0069d9" : "#0a2846")};
  }

  &:disabled {
    background: #a71f1f;
    cursor: not-allowed;
  }
`;

const PaymentContentContainer = styled.div<{ isActive: boolean }>`
  overflow: hidden;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  /* transform: ${({ isActive }) => (isActive ? "scale(1)" : "scale(0.95)")}; */
  transform: translateX(${({ isActive }) => (isActive ? "0" : "10px")});
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  max-height: ${({ isActive }) => (isActive ? "500px" : "0")};
  margin: ${({ isActive }) => (isActive ? "1rem 0" : "0")};
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 25px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  label {
    font-weight: bold;
  }

  input {
    width: 50px;
    padding: 0.5rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.background};
    font-size: ${({ theme }) => theme.fontSizes.text}px;
    border-radius: 4px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TotalPagar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const PaymentMethodTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  border-bottom: 1px solid #ddd;
`;

const PaymentTab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  transition: all 0.2s ease-in-out;
  gap: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #000;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    gap: 10px;
  }

  &.is-active {
    color: ${({ theme }) => theme.colors.text};
    gap: 10px;

    &::after {
      transform: scaleX(1);
    }
  }

  &:hover {
    color: #333;
  }
`;

const PaymentTabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const QR_Container = styled.div`
  align-self: flex-end;
`;

const PaymentDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem 0;
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const PaymentLabel = styled.label`
  font-weight: bold;
`;

const PaymentInput = styled.input`
  padding: 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  border-radius: 4px;
  width: 150px;
`;

const Vuelto = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: green;
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #0000006c;
  color: ${({ theme }) => theme.colors.text};
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
  font-size: 0.8rem;

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

const FinalizarButton = styled.button`
  color: ${({ theme }) => theme.colors.text};
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
    ${Tooltip} {
      visibility: ${(props) => (props.disabled ? "visible" : "hidden")};
      opacity: ${(props) => (props.disabled ? 1 : 0)};
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;

const QRCodeContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  gap: 15px;
`;
