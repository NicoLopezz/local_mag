import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Empleado_Card } from "../../molecules/cards/Empleado_Card";
import { Add_Empleado_Card } from "../../molecules/cards/Add_Empleado_Card";
import { Empleado_Detail } from "../../organisms/modals_details/empleados/Empleados_Detail";
import { useRouter } from "next/router";
import { useLang } from "@/context/Language_Context";
import { Divider} from "@/components/atoms/Divider";

interface Empleado {
  name: string;
  role: string;
  imageUrl: string;
  email: string;
  phone: string;
}

interface Props {
  empleado: Empleado[];
  onAddEmpleado: () => void;
}

export const Empleados_List: FC<Props> = ({ empleado, onAddEmpleado }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    const params = new URLSearchParams(router.query as Record<string, string>);
    params.delete("email");
    router.replace(`/empleados?${params.toString()}`, undefined, {
      shallow: true,
    });
    setModalOpen(false);
  };

  const [modalEmpleadoName, setModalEmpleadoName] = useState("");

  const selectedEmail =
    typeof router.query.email === "string" ? router.query.email : null;

  const handleSelect = (email: string) => {
    const currentEmail = router.query.email;
    const params = new URLSearchParams(router.query as Record<string, string>);

    params.set("email", email); //

    const empleados = empleado.find((p) => p.email === email);

    router.replace(`/empleados?${params.toString()}`);

    if (empleado && currentEmail !== email) {
      if (empleados) {
        setModalEmpleadoName(empleados.name);
      }
      setModalOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  const { t } = useLang();

  return (
    <>
      <Container>
        <Title>{t.empleados.title}</Title>
        <Divider />
        <Empleados_Container>
          <Empleado_Wrapper>
            <Add_Empleado_Card onAddRole={onAddEmpleado} />
          </Empleado_Wrapper>
          {empleado.map((empleado, index) => (
            <Empleado_Wrapper key={index}>
              <Empleado_Card
                {...empleado}
                isSelected={selectedEmail === empleado.email}
                onSelect={() => handleSelect(empleado.email)}
              />
            </Empleado_Wrapper>
          ))}
        </Empleados_Container>
      </Container>

      {modalOpen && (
        <Empleado_Detail onClose={handleCloseModal} employeeName={null} />
      )}
    </>
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
  width: 95%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: -10px;
  margin-right: -0.1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.title * 0.8}px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #cccccc16;
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
