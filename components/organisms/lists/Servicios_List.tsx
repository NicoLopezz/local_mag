import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Service_Card } from "../../molecules/cards/Service_Card";
import { Add_Service_Card } from "../../molecules/cards/Add_Service_Card";

interface Service {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

interface Props {
  services: Service[];
  onAddServicio: () => void;
}

export const Servicios_List: FC<Props> = ({ services, onAddServicio }) => {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | null>(null);

  const handleSelect = (title: string) => {
    setSelectedServiceTitle((prev) => (prev === title ? null : title));
  };

  return (
    <Container>
      <Title>Servicios</Title>
      <Divider />
      <Services_Container>
        <Service_Wrapper>
          <Add_Service_Card onAddProduct={onAddServicio} />
        </Service_Wrapper>
        {services.map((service, index) => (
          <Service_Wrapper key={index}>
            <Service_Card
              {...service}
              isSelected={selectedServiceTitle === service.title}
              onSelect={() => handleSelect(service.title)}
            />
          </Service_Wrapper>
        ))}
      </Services_Container>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: -10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 15px;
`;

const Services_Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: auto;
  max-height: 300px;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  justify-content: flex-start;
  align-items: stretch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;

const Service_Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 0.5s ease;
`;
