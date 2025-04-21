import styled from "styled-components";

import { useTransactions } from "@/context/Transacciones_Context";


interface Transaction {
  time: string;
  type: "ingreso" | "egreso";
  description: string;
  stock: string;
}

interface FinanzasBoardProps {
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

export const Finanzas_Board = ({
    activeTab = "day",
    date = new Date(),
  }: FinanzasBoardProps) => {
    const { transactions } = useTransactions();
    
    
    const sortedTransactions = [...transactions].sort((a, b) => {
      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });
  
    
    const totalUnidades = sortedTransactions
      .filter(t => t.type === "ingreso")
      .reduce((sum, t) => sum + Number(t.stock), 0);

  
  const totalIngresos = sortedTransactions
    .filter(t => t.type === "ingreso")
    .reduce((sum, t) => sum + Number(t.stock), 0);

  
  const totalEgresos = sortedTransactions
    .filter(t => t.type === "egreso")
    .reduce((sum, t) => sum + Number(t.stock), 0);

  
  const balanceNeto = totalIngresos - totalEgresos;




  return (
    <BoardWrapper>
      <PageTitle>FINANZAS</PageTitle>

      <TabContainer>
        <TabItem $active={activeTab === "day"}>Día</TabItem>
        <TabItem $active={activeTab === "week"}>Semana</TabItem>
        <TabItem $active={activeTab === "month"}>Mes</TabItem>
        <TabItem $active={activeTab === "year"}>Año</TabItem>
      </TabContainer>

      <CurrentDate>{formatDate(date)}</CurrentDate>

      <ContentContainer>
        <ColumnsWrapper>
          <Column>
            <ColumnHeader>INGRESOS</ColumnHeader>
            <TransactionsList>
              {transactions
                .filter((t) => t.type === "ingreso")
                .map((t, i) => (
                  <TransactionItem key={`ingreso-${i}`} $type="ingreso">
                    <TransactionTime>{t.time}</TransactionTime>
                    <TransactionDesc>{t.description}</TransactionDesc>
                    <TransactionAmount $type="ingreso">
                      {t.stock}
                    </TransactionAmount>
                  </TransactionItem>
                ))}
            </TransactionsList>
          </Column>

          <Column>
            <ColumnHeader>EGRESOS</ColumnHeader>
            <TransactionsList>
              {transactions
                .filter((t) => t.type === "egreso")
                .map((t, i) => (
                  <TransactionItem key={`egreso-${i}`} $type="egreso">
                    <TransactionTime>{t.time}</TransactionTime>
                    <TransactionDesc>{t.description}</TransactionDesc>
                    <TransactionAmount $type="egreso">
                      {t.stock}
                    </TransactionAmount>
                  </TransactionItem>
                ))}
            </TransactionsList>
          </Column>
        </ColumnsWrapper>

        <BalanceColumn>
          <ColumnHeader>BALANCE</ColumnHeader>
          <BalanceContent>
            <BalanceRow>
              <span>Total Ingresos:</span>
              <span>${totalIngresos.toFixed(2)}</span>
            </BalanceRow>
            <BalanceRow>
              <span>Total Egresos:</span>
              <span>-${Math.abs(totalEgresos).toFixed(2)}</span>
            </BalanceRow>
            <BalanceRow $highlight>
              <span>Balance Neto:</span>
              <span>${balanceNeto.toFixed(2)}</span>
            </BalanceRow>
          </BalanceContent>
        </BalanceColumn>
      </ContentContainer>
    </BoardWrapper>
  );
};




const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TabItem = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active }) => ($active ? "#2c3e50" : "#e0e0e0")};
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
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  padding: 1rem;
  background: #000000;
  color: white;
  font-weight: 600;
  text-align: center;
`;

const TransactionsList = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const TransactionItem = styled.div<{ $type: "ingreso" | "egreso" }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid
    ${({ $type }) => ($type === "ingreso" ? "#27ae60" : "#e74c3c")};
  gap: 0.5rem;
`;

const TransactionTime = styled.div`
  color: #7f8c8d;
  font-size: 0.8rem;
  min-width: 40px;
`;

const TransactionDesc = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionAmount = styled.div<{ $type: "ingreso" | "egreso" }>`
  font-weight: bold;
  color: ${({ $type }) => ($type === "ingreso" ? "#27ae60" : "#e74c3c")};
`;

const BalanceColumn = styled.div`
  flex: 1;
  max-width: 300px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const BalanceContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const BalanceRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  font-weight: ${({ $highlight }) => ($highlight ? "bold" : "normal")};
  background: ${({ $highlight }) => ($highlight ? "#f8f9fa" : "transparent")};

  &:last-child {
    border-bottom: none;
  }
`;
