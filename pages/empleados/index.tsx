import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Roles_Empleados_List } from "../../components/organisms/lists/Roles_Empleados_List";
import { Empleados_List } from "../../components/organisms/lists/Empleados_List";
import { Add_Empleado_Modal } from "../../components/organisms/add_modals/Add_Empleado_Modal";
import { Add_Rol_Modal } from "../../components/organisms/add_modals/Add_Rol_Modal";
import { mockData } from "../../mock_data/empleados";
import { Toast } from "../../components/atoms/notification/Toast";
import { useSearch } from "../../context/Search_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Empleados: NextPage = () => {
  const [selectedRol, setSelectedRol] = useState<string | null>(null);
  const [empleadoModalOpen, setEmpleadoModalOpen] = useState(false);
  const [rolModalOpen, setRolModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { query } = useSearch();
  const hasSelectedManually = useRef(false);

  const handleRolSelect = (rol: string) => {
    hasSelectedManually.current = true;
    setSelectedRol((prev) => (prev === rol ? null : rol));
  };

  const handleAddEmpleado = () => setEmpleadoModalOpen(true);
  const handleCloseEmpleadoModal = () => setEmpleadoModalOpen(false);

  const handleOpenRolModal = () => setRolModalOpen(true);
  const handleCloseRolModal = () => setRolModalOpen(false);

  const handleEmpleadoSubmit = () => {
    setEmpleadoModalOpen(false);
    setToastMessage("Empleado creado con éxito");
  };

  const handleRolSubmit = () => {
    setRolModalOpen(false);
    setToastMessage("Rol creado con éxito");
  };

  const handleCloseToast = () => setToastMessage(null);

  useEffect(() => {
    if (hasSelectedManually.current) return;

    if (query.trim() === "") {
      setSelectedRol(null);
      return;
    }

    const match = mockData.roles.find((rol) =>
      rol.title.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      setSelectedRol(match.title);
    } else {
      setSelectedRol(null);
    }
  }, [query]);

  const rolesFormatted = mockData.roles.map((rol) => ({
    title: rol.title,
    description: rol.description,
    imageUrl: rol.imageUrl,
    href: rol.href,
    empleados: rol.empleados,
  }));

  const empleadosFormatted = mockData.empleados
    .filter(
      (empleado) =>
        (!selectedRol || empleado.role === selectedRol) &&
        (!query || empleado.name.toLowerCase().includes(query.toLowerCase()))
    )
    .map((empleado) => ({
      name: empleado.name,
      role: empleado.role,
      email: empleado.email,
      phone: empleado.phone,
      imageUrl: empleado.imageUrl,
    }));

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Roles_Empleados_List
            categories={rolesFormatted}
            onCategorySelect={handleRolSelect}
            onAddCategory={handleOpenRolModal}
            selectedCategory={selectedRol}
          />
          <Empleados_List
            key={selectedRol || query || "all"}
            products={empleadosFormatted}
            onAddProduct={handleAddEmpleado}
          />
        </Content_Area>
      </Main_Content>

      {empleadoModalOpen && (
        <Add_Empleado_Modal
          onClose={handleCloseEmpleadoModal}
          onSubmit={handleEmpleadoSubmit}
        />
      )}
      {rolModalOpen && (
        <Add_Rol_Modal onClose={handleCloseRolModal} onSubmit={handleRolSubmit} />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </Page_Container>
  );
};

const Page_Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0px;
  flex-grow: 1;
`;

const Content_Area = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: calc(100vw - ${Sidebar_Width});
  margin-left: 2rem;
`;

export default Empleados;
