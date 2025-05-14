import { createContext, useContext, useState, ReactNode } from "react";

interface ProductoPedido {
  price: number;
  id: string;
  title: string;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

interface Pedido {
  id: string;
  time: string;
  status: "abierto" | "cerrado" | "cancelado";
  proveedorName: string;
  productos: ProductoPedido[];
}

interface PedidosContextType {
  pedidos: Pedido[];
  agregarProductoAPedido: (pedidoId: string, producto: ProductoPedido) => void;
  crearNuevoPedido: (pedidoData: {
    proveedorName: string;
    status: "abierto" | "cerrado" | "cancelado"; 
    productos?: ProductoPedido[];
  }) => Pedido;
  pedidoSeleccionadoId: string | null; 
  setPedidoSeleccionadoId: (id: string | null) => void;
  isPedidoAbierto: (pedidoId: string | null) => boolean;
}
const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

const pedidosIniciales: Pedido[] = [
  {
    id: "1",
    time: "10:30 AM",
    status: "abierto",
    proveedorName: "Distribuidora La Nueva America",
    productos: []
  },
  {
    id: "2",
    time: "11:45 AM",
    status: "cerrado",
    proveedorName: "Mayorista Sergio",
    productos: []
  },
  {
    id: "3",
    time: "09:15 AM",
    status: "cerrado",
    proveedorName: "Mayorista San Jose",
    productos: []
  }
];

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [pedidoSeleccionadoId, setPedidoSeleccionadoId] = useState<string | null>(null);

  const agregarProductoAPedido = (pedidoId: string, newProduct: ProductoPedido) => {
    setPedidos(prev => prev.map(pedido => {
      if (pedido.id === pedidoId) {
        const existingProduct = pedido.productos.find(p => p.id === newProduct.id);

        if (existingProduct) {
          return {
            ...pedido,
            productos: pedido.productos.map(p =>
              p.id === newProduct.id
                ? { ...p, quantity: p.quantity + newProduct.quantity }
                : p
            )
          };
        }

        return {
          ...pedido,
          productos: [...pedido.productos, newProduct]
        };
      }
      return pedido;
    }));
  };

  const crearNuevoPedido = (pedidoData: {
    proveedorName: string;
    status: "abierto" | "cerrado" | "cancelado";
    productos?: ProductoPedido[];
  }) => {
    const newPedido: Pedido = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      status: pedidoData.status,
      proveedorName: pedidoData.proveedorName,
      productos: pedidoData.productos || []
    };
    setPedidos(prev => [...prev, newPedido]);
    return newPedido;
  };

  const isPedidoAbierto = (pedidoId: string | null): boolean => {
    if (!pedidoId) return false;
    const pedido = pedidos.find(p => p.id === pedidoId);
    return !!pedido && pedido.status === 'abierto';
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        agregarProductoAPedido,
        crearNuevoPedido,
        pedidoSeleccionadoId, 
        setPedidoSeleccionadoId,
        isPedidoAbierto, 
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (context === undefined) {
    throw new Error("usePedidos must be used within a PedidosProvider");
  }
  return context;
};
