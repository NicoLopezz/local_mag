import { createContext, useContext, useState, ReactNode } from "react";

interface Envio {
  id: string;
  time: string;
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
  clienteName: string;
  direccion: string;
  progress: "25" | "50" | "75" | "100";
  productos: ProductoEnvio[];
}

interface ProductoEnvio {
  price: number;
  id: string;
  title: string;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

interface EnviosContextType {
  envios: Envio[];
  agregarProductoAEnvio: (envioId: string, producto: ProductoEnvio) => void;
  crearNuevoEnvio: (envioData: {
    clienteName: string;
    direccion: string;
    status: "pendiente" | "en_camino" | "entregado" | "cancelado";
    progress: "25" | "50" | "75" | "100";
    productos?: ProductoEnvio[];
  }) => Envio;
  envioSeleccionadoId: string | null;
  setEnvioSeleccionadoId: (id: string | null) => void;
  isEnvioPendiente: (envioId: string | null) => boolean;
}

const EnviosContext = createContext<EnviosContextType | undefined>(undefined);

const enviosIniciales: Envio[] = [
  {
    id: "e1",
    time: "09:00 AM",
    status: "en_camino",
    clienteName: "Mayorista Juan",
    direccion: "Calle Falsa 123",
    progress: "75",
    productos: [
      {
        price: 1.5,
        id: "p1-e1",
        title: "Coca-Cola 500ml",
        quantity: 2,
        description: "Refresco de cola",
        imageUrl: "/images/products/coca-cola.png",
      },
      {
        price: 2.0,
        id: "p2-e1",
        title: "Pan Integral",
        quantity: 1,
        description: "Paquete de pan integral",
        imageUrl: "/images/products/pan-integral.png",
      },
    ],
  },
  {
    id: "e2",
    time: "10:15 AM",
    status: "entregado",
    clienteName: "Mayorista Roberto",
    direccion: "Avenida Siempreviva 742",
    progress: "100",
    productos: [
      {
        price: 5.99,
        id: "p1-e2",
        title: "Leche Entera 1L",
        quantity: 3,
        description: "Botella de leche entera",
        imageUrl: "/images/products/leche-entera.png",
      },
    ],
  },
  {
    id: "e3",
    time: "11:30 AM",
    status: "en_camino",
    clienteName: "Super La Estrella",
    direccion: "Pasaje Secreto 555",
    progress: "75",
    productos: [
      {
        price: 0.75,
        id: "p1-e3",
        title: "Manzana Roja",
        quantity: 5,
        description: "Manzana roja fresca",
        imageUrl: "/images/products/manzana-roja.png",
      },
      {
        price: 1.2,
        id: "p2-e3",
        title: "Plátano",
        quantity: 4,
        description: "Plátano maduro",
        imageUrl: "/images/products/platano.png",
      },
      {
        price: 3.5,
        id: "p3-e3",
        title: "Café Molido 250g",
        quantity: 1,
        description: "Paquete de café molido",
        imageUrl: "/images/products/cafe-molido.png",
      },
    ],
  },
  {
    id: "e4",
    time: "11:30 AM",
    status: "cancelado",
    clienteName: "Coto",
    direccion: "Pasaje Secreto 555",
    progress: "75",
    productos: [
      {
        price: 0.75,
        id: "p1-e3",
        title: "Manzana Roja",
        quantity: 5,
        description: "Manzana roja fresca",
        imageUrl: "/images/products/manzana-roja.png",
      },
      {
        price: 1.2,
        id: "p2-e3",
        title: "Plátano",
        quantity: 4,
        description: "Plátano maduro",
        imageUrl: "/images/products/platano.png",
      },
      {
        price: 3.5,
        id: "p3-e3",
        title: "Café Molido 250g",
        quantity: 1,
        description: "Paquete de café molido",
        imageUrl: "/images/products/cafe-molido.png",
      },
    ],
  },
  {
    id: "e5",
    time: "11:30 AM",
    status: "pendiente",
    clienteName: "Coto",
    direccion: "Pasaje Secreto 555",
    progress: "50",
    productos: [
      {
        price: 0.75,
        id: "p1-e3",
        title: "Manzana Roja",
        quantity: 5,
        description: "Manzana roja fresca",
        imageUrl: "/images/products/manzana-roja.png",
      },
      {
        price: 1.2,
        id: "p2-e3",
        title: "Plátano",
        quantity: 4,
        description: "Plátano maduro",
        imageUrl: "/images/products/platano.png",
      },
      {
        price: 3.5,
        id: "p3-e3",
        title: "Café Molido 250g",
        quantity: 1,
        description: "Paquete de café molido",
        imageUrl: "/images/products/cafe-molido.png",
      },
    ],
  },
];

export const EnviosProvider = ({ children }: { children: ReactNode }) => {
  const [envios, setEnvios] = useState<Envio[]>(enviosIniciales);
  const [envioSeleccionadoId, setEnvioSeleccionadoId] = useState<string | null>(
    null
  );

  const agregarProductoAEnvio = (
    envioId: string,
    newProduct: ProductoEnvio
  ) => {
    setEnvios((prev) =>
      prev.map((envio) => {
        if (envio.id === envioId) {
          const existingProduct = envio.productos.find(
            (p) => p.id === newProduct.id
          );

          if (existingProduct) {
            return {
              ...envio,
              productos: envio.productos.map((p) =>
                p.id === newProduct.id
                  ? { ...p, quantity: p.quantity + newProduct.quantity }
                  : p
              ),
            };
          }

          return {
            ...envio,
            productos: [...envio.productos, newProduct],
          };
        }
        return envio;
      })
    );
  };

  const crearNuevoEnvio = (envioData: {
    clienteName: string;
    direccion: string;
    status: "pendiente" | "en_camino" | "entregado" | "cancelado";
    productos?: ProductoEnvio[];
    progress: "25" | "50" | "75" | "100";
  }) => {
    const newEnvio: Envio = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      status: envioData.status,
      clienteName: envioData.clienteName,
      direccion: envioData.direccion,
      productos: envioData.productos || [],
      progress: envioData.progress,
    };
    setEnvios((prev) => [...prev, newEnvio]);
    return newEnvio;
  };

  const isEnvioPendiente = (envioId: string | null): boolean => {
    if (!envioId) return false;
    const envio = envios.find((e) => e.id === envioId);
    return !!envio && envio.status === "pendiente";
  };

  return (
    <EnviosContext.Provider
      value={{
        envios,
        agregarProductoAEnvio,
        crearNuevoEnvio,
        envioSeleccionadoId,
        setEnvioSeleccionadoId,
        isEnvioPendiente,
      }}
    >
      {children}
    </EnviosContext.Provider>
  );
};

export const useEnvios = () => {
  const context = useContext(EnviosContext);
  if (context === undefined) {
    throw new Error("useEnviosContext must be used within a EnviosProvider");
  }
  return context;
};
