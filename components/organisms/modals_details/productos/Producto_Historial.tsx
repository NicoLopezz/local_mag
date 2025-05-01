import { FC, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData as productMockData } from "@/mock_data/products";

interface Sale {
  id: number;
  date: string;
  quantity: number;
  seller: string;
}

export const Producto_Historial: FC = () => {
  const { query } = useRouter();
  const productCode = typeof query.productCode === "string" ? query.productCode : "";
  const product = productMockData.products.find((p) => p.productCode === productCode);

  const ejemploVentas: Sale[] = product
    ? [
        { id: 1, date: "2025-04-23T10:00:00-03:00", quantity: 2, seller: "Vendedor A" },
        { id: 2, date: "2025-04-23T11:30:00-03:00", quantity: 1, seller: "Vendedor B" },
        { id: 3, date: "2025-04-24T09:15:00-03:00", quantity: 3, seller: "Vendedor C" },
        { id: 4, date: "2025-04-24T14:45:00-03:00", quantity: 5, seller: "Vendedor A" },
        { id: 5, date: "2025-04-25T16:20:00-03:00", quantity: 2, seller: "Vendedor B" },
        { id: 6, date: "2025-04-26T18:00:00-03:00", quantity: 1, seller: "Vendedor C" },
      ]
    : [];

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const filteredSales = ejemploVentas.filter((sale) => {
    const saleDate = new Date(sale.date).toISOString().slice(0, 10);
    const start = startDate ? new Date(startDate).toISOString().slice(0, 10) : "";
    const end = endDate ? new Date(endDate).toISOString().slice(0, 10) : "";

    if (start && end) {
      return saleDate >= start && saleDate <= end;
    } else if (start) {
      return saleDate >= start;
    } else if (end) {
      return saleDate <= end;
    }
    return true;
  });

  if (!product) return <Mensaje>No se encontró el producto</Mensaje>;

  return (
    <Container>
      <Section>
        <StockHeader>
          <Title>Historial de ventas: {product.title}</Title>
          <TotalVentas>Total vendido: {filteredSales.reduce((sum, sale) => sum + sale.quantity, 0)} unidades</TotalVentas>
        </StockHeader>
        <FilterContainer>
          <FilterLabel>Desde:</FilterLabel>
          <FilterInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />      
          <FilterLabel>Hasta:</FilterLabel>
          <FilterInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FilterContainer>
      </Section>

      {filteredSales.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow header>
                <TableHeader>Fecha</TableHeader>
                <TableHeader>Hora</TableHeader>
                <TableHeader align="center">Cantidad</TableHeader>
                <TableHeader>Vendedor</TableHeader>
                <Divider/>
              </TableRow>
              
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell>{formatTime(sale.date)}</TableCell>
                  <TableCell align="center">
                    <QuantityBadge>{sale.quantity}</QuantityBadge>
                  </TableCell>
                  <TableCell>
                    <SellerBadge>{sale.seller}</SellerBadge>
                  </TableCell>
                  <Divider/>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Mensaje>No hay registros de ventas para este periodo</Mensaje>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 2;
  background: #f9f9f9;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  height: 80%;
  overflow-y: auto;
  animation: fadeIn 0.4s ease;
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
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #000000;
`;

const TotalVentas = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  text-align: center;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #de1919;
  margin: 1.5rem 0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ header?: boolean }>`
  ${({ header }) => header && `
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.343);

  `}

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  &:hover {
    ${({ header }) => !header && `
      background: rgba(255, 255, 255, 0.05);
    `}
  }
`;

const TableHeader = styled.th<{ align?: string }>`
  padding: 1rem;
  text-align: ${({ align }) => align || 'left'};
  font-weight: 600;
  color: #000000;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td<{ align?: string }>`
  padding: 1rem;
  text-align: ${({ align }) => align || 'left'};
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.95rem;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 1.5rem 0;
`;

const QuantityBadge = styled.span`
  display: inline-block;
  min-width: 24px;
  padding: 0.25rem 0.5rem;
  color: #4CAF50;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
`;

const SellerBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.8rem;
  color: #000000;
  border-radius: 16px;
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.9rem;
`;