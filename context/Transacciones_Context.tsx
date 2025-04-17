import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Transaction {
  time: string;
  type: "ingreso" | "egreso";
  description: string;
  sku: string;
  category: string;
  stock: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addSaleTransaction: (product: {
    title: string;
    productCode: string;
    category: string;
    units: number;
  }) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const addSaleTransaction = useCallback((product: {
    title: string;
    productCode: string;
    category: string;
    units: number;
  }) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setTransactions(prev => [
      ...prev,
      {
        time,
        type: "ingreso",
        description: product.title,
        sku: product.productCode,
        category: product.category,
        stock: product.units.toString()
      }
    ]);
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, addSaleTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};