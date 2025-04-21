import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/products";
import { useTransactions } from "@/context/Transacciones_Context";
import { useToast } from "@/context/Toast_Context";
import { usePedidos } from "@/context/Pedidos_Contex";
import { Add_Pedido_Modal } from "@/components/organisms/add_modals/Add_Pedido_Modal";



interface ProductoPedido {
  id: string;
  title: string;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export const Producto_Stock: FC = () => {
  const { query } = useRouter();
  const { pedidos, agregarProductoAPedido, crearNuevoPedido } = usePedidos();
  const { showToast } = useToast();
  const productCode =
    typeof query.productCode === "string" ? query.productCode : "";
  const product = mockData.products.find((p) => p.productCode === productCode);

  const initialStock = product?.stock ?? 0;
  const title = product?.title;
  const category = product?.category;

  const [stockTotal, setStockTotal] = useState(initialStock);
  const [inputValue, setInputValue] = useState(String(initialStock));
  const [hasChanges, setHasChanges] = useState(false);

  const stockMinimo = 15;
  const consumoSemanal = 18;
  const diasReposicion = 12;
  const recomendacionPedido = 40;
  const stockPorSucursal = [
    { nombre: "Sucursal Centro", cantidad: 10 },
    { nombre: "Sucursal Norte", cantidad: 8 },
    { nombre: "Depósito Central", cantidad: 12 },
  ];
  const historial = [
    { fecha: "03/04/2025", tipo: "Salida", cantidad: 5 },
    { fecha: "01/04/2025", tipo: "Ingreso", cantidad: 20 },
    { fecha: "28/03/2025", tipo: "Salida", cantidad: 8 },
  ];

  const { addTransaction } = useTransactions();

  useEffect(() => {
    setInputValue(String(stockTotal));
  }, [stockTotal]);

    // Efecto para sincronizar el input con el estado
    useEffect(() => {
      setInputValue(String(stockTotal));
    }, [stockTotal]);

  // Manejadores para cambiar el stock
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
    const numValue = inputValue === "" ? initialStock : Math.max(initialStock, parseInt(inputValue));
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

   // Manejador para guardar cambios de stock
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


  // Manejador para agregar a pedido
  const handleAddPedido = () => {
    if (!product) {
      showToast("Error: Producto no encontrado");
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
      imageUrl: product.imageUrl
    };
  
    
    const pedidoAbierto = pedidos.find(p => p.status === "abierto");
    
    if (pedidoAbierto) {
      agregarProductoAPedido(pedidoAbierto.id, productoParaPedido);
      showToast(`Producto agregado al pedido de ${pedidoAbierto.proveedorName}`);
    } else {
      crearNuevoPedido({
        proveedorName: "Proveedor General",
        productos: [productoParaPedido]
      });
      showToast(`Producto agregado a nuevo pedido`);
    }
    setHasChanges(false);
  };



  const diasRestantes = Math.floor(stockTotal / (consumoSemanal / 7));

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
            <SaveButton onClick={handleAddPedido}>Agregar a pedido</SaveButton>
          )}
        </Btn_Wrapper>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Distribution by branch</SubTitle>
        <List>
          {stockPorSucursal.map((s) => (
            <li key={s.nombre}>
              <strong>{s.nombre}:</strong> {s.cantidad} units
            </li>
          ))}
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Rotation and estimates</SubTitle>
        <List>
          <li>
            Average days between restocks: <strong>{diasReposicion}</strong>
          </li>
          <li>
            Units sold per week: <strong>{consumoSemanal}</strong>
          </li>
          <li>
            Estimated depletion: <strong>{diasRestantes} days</strong>
          </li>
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Order suggestion</SubTitle>
        <List>
          <li>
            Restock: <strong>{recomendacionPedido}</strong> units
          </li>
          <li>Next restock: 08/04/2025</li>
          <li>Automatic restocking: enabled</li>
        </List>
      </Section>

      <Divider />

      <Section>
        <SubTitle>Recent movements</SubTitle>
        <List>
          {historial.map((mov, i) => (
            <li key={i}>
              {mov.fecha} – <strong>{mov.tipo}</strong> of{" "}
              <strong>{mov.cantidad}</strong> units
            </li>
          ))}
        </List>
      </Section>
    </Container>
  );
};

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
  position: relative; /* Necesario para posicionar el tooltip */
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

    /* Mostrar tooltip solo cuando está deshabilitado */
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
