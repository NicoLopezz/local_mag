import { FC, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Stock_Base_Detail_Modal } from "@/components/organisms/stock_modals/Stock_Base_Detail_Modal";
import { mockData } from "@/mock_data/products";
import styled from "styled-components";

interface Props {
  onClose: () => void;
}

interface PaymentDetailsProps {
  onProveedorSeleccionado?: (proveedor: string) => void;
}

export const Stock_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Stock");
  const [activePaymentTab, setActivePaymentTab] = useState("Stock");
  const { query } = useRouter();
  const productCode =
    typeof query.productCode === "string" ? query.productCode : "";
  const producto = mockData.products.find((p) => p.productCode === productCode);
  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCantidad(value);
    }
  };

  const [selectedProveedor, setSelectedProveedor] = useState("");
  const proveedoresEjemplo = [
    "Distribuidora Norte",
    "Supermercado Centro",
    "Mayorista del Sur",
  ];

  const handleProveedorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nuevoProveedor = event.target.value;
    setSelectedProveedor(nuevoProveedor);
  };

  const [selectedOrdenCompra, setSelectedOrdenCompra] = useState("");
  const ordenesCompraEjemplo = ["OC-001", "OC-003", "OC-007"];

  const handleOrdenCompraChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nuevaOrdenCompra = event.target.value;
    setSelectedOrdenCompra(nuevaOrdenCompra);
  };

  const [contadorActivo, setContadorActivo] = useState(false);
  const [contador, setContador] = useState<number | null>(null);

  return (
    <Stock_Base_Detail_Modal
      tabs={["Stock"]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
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
      {activeTab === "Stock" && (
        <CobrarSection>
          {producto && (
            <>
              <ProductInfo>
                <span>{producto.title}</span>
                <span>${producto.stock}</span>
              </ProductInfo>
              <InputGroup>
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  min="1"
                />
              </InputGroup>

              <PaymentContentContainer isActive={activePaymentTab === "Stock"}>
                <PaymentDetails>
                  <PaymentOptions>
                    <PaymentLabel>Seleccione proveedor</PaymentLabel>
                    <PaymentSelect
                      value={selectedProveedor}
                      onChange={handleProveedorChange}
                    >
                      <option value="" disabled>
                        Seleccionar proveedor
                      </option>
                      {proveedoresEjemplo.map((proveedor) => (
                        <option key={proveedor} value={proveedor}>
                          {proveedor}
                        </option>
                      ))}
                    </PaymentSelect>
                    <QuickPaymentButtons>
                      <PaymentActions>
                        <ActionButton disabled={!selectedProveedor}>
                          Limpiar Selección
                        </ActionButton>
                      </PaymentActions>
                    </QuickPaymentButtons>
                  </PaymentOptions>
                  <PaymentOptions>
                    <PaymentLabel>Orden de compra: </PaymentLabel>
                    <PaymentSelect
                      value={selectedOrdenCompra}
                      onChange={handleOrdenCompraChange}
                    >
                      <option value="" disabled>
                        Orden de compra:
                      </option>
                      {ordenesCompraEjemplo.map((orden) => (
                        <option key={orden} value={orden}>
                          {orden}
                        </option>
                      ))}
                    </PaymentSelect>
                    <QuickPaymentButtons>
                      <PaymentActions>
                        <ActionButton
                          onClick={() => console.log("Agregar nueva orden")}
                        >
                          Agregar a nueva orden
                        </ActionButton>
                      </PaymentActions>
                    </QuickPaymentButtons>
                  </PaymentOptions>

                </PaymentDetails>
              </PaymentContentContainer>

              <Finalizar_Wrapper>
                <FinalizarButton disabled={contadorActivo !== true}>
                  Finalizar
                  {contadorActivo !== true && (
                    <Tooltip>Complete los campos</Tooltip>
                  )}
                </FinalizarButton>{" "}
                {contadorActivo && contador !== null && (
                  <ContadorCancelacion activo={contador <= 5}>
                    Cancelación automática en {contador} seg
                  </ContadorCancelacion>
                )}
              </Finalizar_Wrapper>
            </>
          )}
        </CobrarSection>
      )}
    </Stock_Base_Detail_Modal>
  );
};



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

const PaymentSelect = styled.select`
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const CobrarSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  width: 85%;
  background: #f9f9f9;
  border-radius: 16px;
  border: 1px solid #ddd;
  height: 650px;
`;

const QuickPaymentButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const PaymentActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10rem;
  width: 150px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  font-size: 12px;
  padding: 0.65rem;
  border: none;
  border-radius: 8px;
  background: ${({ primary }) => (primary ? "#4478b0" : "#00050a6b")};
  color: ${({ primary }) => (primary ? "white" : "#ffffff")};
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
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
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
  color: #555;
  position: relative;
  transition: all 0.2s ease-in-out;

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
  }

  &.is-active {
    color: #000;

    &::after {
      transform: scaleX(1);
    }
  }

  &:hover {
    color: #333;
  }
`;

const QR_Container = styled.div`
  align-self: flex-end;
`;

const PaymentDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem 0;
  align-items: center;
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const PaymentLabel = styled.label`
  font-size: 15px;
  width:70%;
`;


const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #0000006c;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #777;
`;
