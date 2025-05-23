import styled from "styled-components";
import { useTransactions } from "@/context/Transacciones_Context";
import React, { useState } from "react";
import { Check_Icon } from "@/components/atoms/icons/finanzas_icons/Check_Icon";
import { useLang } from "@/context/Language_Context";

interface Transaction {
  time: string;
  type: "ingreso" | "egreso";
  description: string;
  stock: string;
  id: string;
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
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<Set<string>>(new Set());

  const handleTransactionClick = (id: string) => {
    const newSelection = new Set(selectedTransactionIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedTransactionIds(newSelection);
  };


  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const handleAddPedido = () => setPedidoModalOpen(true);
  const calculateDynamicBalance = () => {
    let totalIngresosSeleccionados = 0;
    let totalEgresosSeleccionados = 0;

    transactions.forEach((t) => {
      if (selectedTransactionIds.has(t.id)) {
        if (t.type === "ingreso") {
          totalIngresosSeleccionados += Number(t.stock);
        } else if (t.type === "egreso") {
          totalEgresosSeleccionados += Number(t.stock);
        }
      }
    });

    return totalIngresosSeleccionados - totalEgresosSeleccionados;
  };

  const { t } = useLang();
  const dynamicBalance = calculateDynamicBalance();

  return (
    <BoardWrapper>
      <PageTitle>{t.finanzas.title}</PageTitle>
      <Divider />
      <TabContainer>
        <TabItem $active={activeTab === "day"}>{t.finanzas.tabs.day}</TabItem>
        <TabItem $active={activeTab === "week"}>{t.finanzas.tabs.week}</TabItem>
        <TabItem $active={activeTab === "month"}>{t.finanzas.tabs.month}</TabItem>
        <TabItem $active={activeTab === "year"}>{t.finanzas.tabs.year}</TabItem>
      </TabContainer>
  
      <CurrentDate>{formatDate(date)}</CurrentDate>
  
      <ContentContainer>
        <ColumnsWrapper>
          <Column>
            <ColumnHeader>{t.finanzas.ingresos}</ColumnHeader>
            <TransactionsList>
              {transactions
                .filter((t) => t.type === "ingreso")
                .map((t, i) => (
                  <TransactionItem
                    key={`ingreso-${i}`}
                    $type="ingreso"
                    onClick={() => handleTransactionClick(t.id)}
                    $isSelected={selectedTransactionIds.has(t.id)}
                  >
                    <TransactionTime>{t.time}</TransactionTime>
                    <TransactionDesc>{t.description}</TransactionDesc>
                    <TransactionAmount $type="ingreso">{t.stock}</TransactionAmount>
                    {selectedTransactionIds.has(t.id) && <CheckIcon />}
                  </TransactionItem>
                ))}
            </TransactionsList>
          </Column>
  
          <Column>
            <ColumnHeader>{t.finanzas.egresos}</ColumnHeader>
            <TransactionsList>
              {transactions
                .filter((t) => t.type === "egreso")
                .map((t, i) => (
                  <TransactionItem
                    key={`egreso-${i}`}
                    $type="egreso"
                    onClick={() => handleTransactionClick(t.id)}
                    $isSelected={selectedTransactionIds.has(t.id)}
                  >
                    <TransactionTime>{t.time}</TransactionTime>
                    <TransactionDesc>{t.description}</TransactionDesc>
                    <TransactionAmount $type="egreso">{t.stock}</TransactionAmount>
                    {selectedTransactionIds.has(t.id) && <CheckIcon />}
                  </TransactionItem>
                ))}
            </TransactionsList>
          </Column>
        </ColumnsWrapper>
  
        <BalanceColumn>
          <ColumnHeader>{t.finanzas.balance.title}</ColumnHeader>
          <BalanceContent>
            <BalanceRow>
              <span>{t.finanzas.balance.totalIngresos}:</span>
              <span>
                ${transactions
                  .filter((t) => t.type === "ingreso")
                  .reduce((sum, t) => sum + Number(t.stock), 0)
                  .toFixed(2)}
              </span>
            </BalanceRow>
            <BalanceRow>
              <span>{t.finanzas.balance.totalEgresos}:</span>
              <span>
                -${Math.abs(
                  transactions
                    .filter((t) => t.type === "egreso")
                    .reduce((sum, t) => sum + Number(t.stock), 0)
                ).toFixed(2)}
              </span>
            </BalanceRow>
            <BalanceRow $highlight>
              <span>{t.finanzas.balance.neto}:</span>
              <span>
                ${dynamicBalance.toFixed(2)} ({t.finanzas.balance.seleccionado})
              </span>
            </BalanceRow>
            <AddButton onClick={handleAddPedido}>{t.finanzas.addPedido}</AddButton>
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
  margin: 0 0 1rem 0;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.title}px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #cccccc16;
  margin-top: 0.5rem; 
  margin-bottom: 1.5rem;
  width: 100%; 
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

const TransactionItem = styled.div<{ $type: "ingreso" | "egreso"; $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: ${({ $isSelected }) => ($isSelected ? "#f0f8ff" : "white")};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid
    ${({ $type }) => ($type === "ingreso" ? "#27ae60" : "#e74c3c")};
  gap: 0.5rem;
  cursor: pointer;
  position: relative; // Establecer como contenedor relativo
  overflow: hidden; // Asegurar que el contenido no se desborde por el icono absoluto
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
  margin-right: 20px; // Espacio para el icono absoluto
  text-align: right; // Alinea el monto a la derecha
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

const AddButton = styled.button`
  background: #000;
  margin-top: 10%;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  width: 70%;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CheckIcon = styled(Check_Icon)`
  color: green;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
`;