import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Transaction {
  id: string;
  time: string;
  type: "ingreso" | "egreso";
  description: string;
  sku: string;
  category: string;
  stock: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (
    type: "ingreso" | "egreso",
    product: {
      title: string;
      productCode: string;
      category: string;
      units: number;
    }
  ) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

// Generador de ID simple sin dependencias
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const addTransaction = useCallback((
    type: "ingreso" | "egreso",
    product: {
      title: string;
      productCode: string;
      category: string;
      units: number;
    }
  ) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setTransactions(prev => [
      ...prev,
      {
        id: generateId(), // ID generado localmente
        time,
        type,
        description: product.title,
        sku: product.productCode,
        category: product.category,
        stock: product.units.toString()
      }
    ]);
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions debe usarse dentro de un TransactionsProvider');
  }
  return context;
};