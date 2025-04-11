import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Empleado_Card } from "../../molecules/cards/Empleado_Card";
import { Add_Empleado_Card } from "../../molecules/cards/Add_Empleado_Card";

interface Empleado {
  name: string;
  role: string;
  imageUrl: string;
  email: string;
  phone: string;
}

interface Props {
  products: Empleado[];
  onAddProduct: () => void;
}

export const Empleados_List: FC<Props> = ({ products, onAddProduct }) => {
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);

  const handleSelect = (email: string) => {
    setSelectedEmpleado((prev) => (prev === email ? null : email));
  };

  return (
    <Container>
      <Title>Empleados</Title>
      <Divider />
      <Empleados_Container>
        <Empleado_Wrapper>
          <Add_Empleado_Card onAddRole={onAddProduct} />
        </Empleado_Wrapper>
        {products.map((empleado, index) => (
          <Empleado_Wrapper key={index}>
            <Empleado_Card
              {...empleado}
              isSelected={selectedEmpleado === empleado.email}
              onSelect={() => handleSelect(empleado.email)}
            />
          </Empleado_Wrapper>
        ))}
      </Empleados_Container>
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

const Empleados_Container = styled.div`
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

const Empleado_Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 0.5s ease;
`;
