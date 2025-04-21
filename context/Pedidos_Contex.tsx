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
      status?: "abierto" | "cerrado" | "cancelado"; 
      productos?: ProductoPedido[];
    }) => Pedido;
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
    status: "cancelado",
    proveedorName: "Mayorista Sergio",
    productos: []
  },
  {
    id: "3",
    time: "09:15 AM",
    status: "cancelado",
    proveedorName: "Mayorista San Jose",
    productos: []
  }
];

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

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
    status?: "abierto" | "cerrado" | "cancelado"; 
    productos?: ProductoPedido[];
  }) => {
    const newPedido: Pedido = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      status: pedidoData.status || "abierto", 
      proveedorName: pedidoData.proveedorName,
      productos: pedidoData.productos || []
    };
  
    console.log("🛠️ Pedido CREADO en contexto:", newPedido);
    setPedidos(prev => [...prev, newPedido]);
    return newPedido;
  };

  return (
    <PedidosContext.Provider value={{ pedidos, agregarProductoAPedido, crearNuevoPedido }}>
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