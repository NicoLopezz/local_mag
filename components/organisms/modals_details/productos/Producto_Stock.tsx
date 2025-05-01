import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/products";
import { useTransactions } from "@/context/Transacciones_Context";
import { useToast } from "@/context/Toast_Context";
import { usePedidos } from "@/context/Pedidos_Context";

interface ProductoPedido {
  id: string;
  title: string;
  quantity: number;
  description?: string;
  imageUrl?: string;
  price?: number;
}

interface ProductoStockProps {
  onCloseModal: () => void;
  onOpenDetailsModal: (productCode: string) => void; 
}

export const Producto_Stock: FC<ProductoStockProps> = ({
  onCloseModal,
  onOpenDetailsModal, 
}) => {
  const { query } = useRouter();
  const { pedidos, agregarProductoAPedido, crearNuevoPedido } = usePedidos();
  const { showToast } = useToast();
  const productCode =
    typeof query.productCode === "string" ? query.productCode : "";
  const product = mockData.products.find((p) => p.productCode === productCode);

  const initialStock = product?.stock ?? 0;
  const [stockTotal, setStockTotal] = useState(initialStock);
  const [inputValue, setInputValue] = useState(String(initialStock));
  const [hasChanges, setHasChanges] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const stockMinimo = 15;
  const consumoSemanal = 18;
 
  const { addTransaction } = useTransactions();

  useEffect(() => {
    setInputValue(String(stockTotal));
  }, [stockTotal]);

  useEffect(() => {
    setInputValue(String(stockTotal));
  }, [stockTotal]);

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      const numValue = value === "" ? 0 : parseInt(value);
      if (numValue >= initialStock || value === "") {
        setInputValue(value);
        setHasChanges(numValue !== initialStock);
      }
    }
  };

  const handleBlur = () => {
    const numValue =
      inputValue === ""
        ? initialStock
        : Math.max(initialStock, parseInt(inputValue));
    setStockTotal(numValue);
    setInputValue(String(numValue));
    setHasChanges(numValue !== initialStock);
  };

  const incrementarStock = () => {
    const newValue = stockTotal + 1;
    setStockTotal(newValue);
    setHasChanges(newValue !== initialStock);
  };

  const decrementarStock = () => {
    if (stockTotal > initialStock) {
      const newValue = stockTotal - 1;
      setStockTotal(newValue);
      setHasChanges(newValue !== initialStock);
    }
  };

  const handleSave = () => {
    const unitsEntered = stockTotal - initialStock;
    addTransaction("egreso", {
      title: product?.title ?? "Unknown Title",
      productCode,
      category: product?.category ?? "Unknown Category",
      units: unitsEntered,
    });
    showToast(`Egreso ${unitsEntered} ${product?.title} registrado`);
    setHasChanges(false);
  };

  const handleAddPedido = () => {
    if (!product) {
      setModalOpen(true);
      return;
    }

    const unidadesAAgregar = stockTotal - initialStock;
    if (unidadesAAgregar <= 0) {
      showToast("No hay unidades para agregar al pedido");
      return;
    }

    const productoParaPedido: ProductoPedido = {
      id: product.productCode,
      title: product.title,
      quantity: unidadesAAgregar,
      description: product.description,
      imageUrl: product.imageUrl,
    };

    const pedidoAbierto = pedidos.find((p) => p.status === "abierto");

    if (pedidoAbierto) {
      agregarProductoAPedido(pedidoAbierto.id, {
        ...productoParaPedido,
        price: productoParaPedido.price ?? 0,
      });
      showToast(
        `Producto agregado al pedido de ${pedidoAbierto.proveedorName}`
      );
    } else {
      crearNuevoPedido({
        proveedorName: "Proveedor General",
        status: "abierto",
      });
      showToast(`Producto agregado a nuevo pedido`);
    }
    setHasChanges(false);
    onCloseModal();
    onOpenDetailsModal(product.productCode); 
  };


  
  const [activePaymentTab, setActivePaymentTab] = useState("Stock");
  const producto = mockData.products.find((p) => p.productCode === productCode);
  

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

  return (
    <Container>
      <Section>
        <StockHeader>
          <Title>Current stock</Title>
          <StockControls>
            <StockButton
              onClick={decrementarStock}
              disabled={stockTotal <= initialStock}
            >
              −
              {stockTotal <= initialStock && (
                <Tooltip>No se puede reducir más</Tooltip>
              )}
            </StockButton>
            <StockInput
              type="text"
              value={inputValue}
              onChange={handleStockChange}
              onBlur={handleBlur}
              placeholder="0"
            />
            <StockButton onClick={incrementarStock}>+</StockButton>
          </StockControls>
        </StockHeader>

        <StockLine>
          <Stock_Number low={stockTotal < stockMinimo}>
            {stockTotal} units
          </Stock_Number>
          {stockTotal < stockMinimo && <Badge>Low stock</Badge>}
        </StockLine>

        <Btn_Wrapper>
          {hasChanges && (
            <SaveButton onClick={handleSave}>
              Confimar {-(initialStock - stockTotal)}
            </SaveButton>
          )}
          {hasChanges && (
            <div>
              <SaveButton onClick={handleAddPedido}>Agregar a pedido</SaveButton>
            </div>
          )}
        </Btn_Wrapper>
      </Section>
      <Divider/>
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

    </Container>
  );
};

const PaymentContentContainer = styled.div<{ isActive: boolean }>`
  overflow: hidden;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  transform: translateX(${({ isActive }) => (isActive ? "0" : "10px")});
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  max-height: ${({ isActive }) => (isActive ? "500px" : "0")};
  margin: ${({ isActive }) => (isActive ? "1rem 0" : "0")};
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

const PaymentSelect = styled.select`
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
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




const Container = styled.div`
  flex: 2;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  height: 80%;
  overflow-y: auto;
  animation: fadeIn 0.4s ease;
  opacity: 0;
  transform: translateY(10px);
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const StockControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const StockInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #555;
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

const StockButton = styled.button<{ disabled?: boolean }>`
  position: relative;
  background: #2a9d8f;
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "#2a9d8f")};
  color: ${(props) => (props.disabled ? "#a0a0a0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f0f0f0" : "#21867a")};

    ${Tooltip} {
      visibility: ${(props) => (props.disabled ? "visible" : "hidden")};
      opacity: ${(props) => (props.disabled ? 1 : 0)};
    }
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "scale(0.95)")};
  }
`;

const Btn_Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StockLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0.5rem 0;
`;

const SaveButton = styled.button`
  background: #2a9d8f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.1s;
  margin-top: 0.5rem;

  &:hover {
    background: #21867a;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
`;

const Stock_Number = styled.div<{ low?: boolean }>`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ low }) => (low ? "#e63946" : "#2a9d8f")};
  margin-bottom: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: #ffdddd;
  color: #c0392b;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: 500;
`;
