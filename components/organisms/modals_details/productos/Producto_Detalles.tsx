import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/products";
import { QRCodeCanvas } from "qrcode.react";
import { useLang } from "@/context/Language_Context";
import { Divider } from "@/components/atoms/Divider";


export const Producto_Detalles: FC = () => {
  const { query } = useRouter();
  const productCode = typeof query.productCode === "string" ? query.productCode : "";
  const product = mockData.products.find((p) => p.productCode === productCode);
  if (!product) return <Mensaje>No se encontró el producto</Mensaje>;
  const { t } = useLang();


  return (
  <Info_Container>
    <Info_Content>
      <Title>{product.title}</Title>
      <Divider />
      <SubTitle>{t.modals.productos.detalles.title}</SubTitle>
      <Details_List>
        <Item><Label>{t.modals.productos.detalles.descripcion}:</Label> {product.description}</Item>
        <Item><Label>{t.modals.productos.detalles.categoria}:</Label> {product.category}</Item>
        <Item><Label>{t.modals.productos.detalles.stockDisponible}:</Label> {product.stock}</Item>
        <Item><Label>{t.modals.productos.detalles.codigo}:</Label> {product.productCode}</Item>
      </Details_List>
    </Info_Content>

    <QR_Container> 
      <QRCodeCanvas
        value={`https://tusitio.com/products/${product.productCode}`}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
    </QR_Container>
  </Info_Container>
);


};

const Info_Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 16px;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.4s ease;
`;

const Info_Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SubTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;


const Details_List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Item = styled.li`
  display: flex;
  gap: 0.25rem;
  line-height: 1.5;
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const QR_Container = styled.div`
  align-self: flex-end;

`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
`;
