import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/servicios";
import { QRCodeCanvas } from "qrcode.react";

export const Service_Detalles: FC = () => {
  const { query } = useRouter();
  const serviceTitle = typeof query.service === "string" ? query.service : "";
  const service = mockData.services.find((s) => s.title === serviceTitle);

  if (!service) return <Mensaje>No se encontró el servicio</Mensaje>;

  return (
    <Info_Container>
      <Info_Content>
        <Title>{service.title}</Title>
        <Divider />
        <SubTitle>Detalles del servicio</SubTitle>
        <Details_List>
          <Item><Label>Descripción:</Label> {service.description}</Item>
          <Item><Label>Categoría:</Label> {service.category}</Item>
        </Details_List>
      </Info_Content>

      <QR_Container> 
        <QRCodeCanvas
          value={`https://tusitio.com/servicios/${encodeURIComponent(service.title)}`}
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
  background: rgba(255, 255, 255, 0.12);
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
  color: #2e2e2e;
`;

const SubTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 500;
  color: #555;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.25rem 0 0.5rem;
`;

const Details_List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #444;
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
  color: #333;
`;

const QR_Container = styled.div`
  align-self: flex-end;
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
`;
