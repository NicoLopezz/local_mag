import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Roles_Empleados_List } from "../../components/organisms/lists/Roles_Empleados_List";
import { Empleados_List } from "../../components/organisms/lists/Empleados_List";
import { Add_Empleado_Modal } from "../../components/organisms/add_modals/Add_Empleado_Modal";
import { Add_Rol_Modal } from "../../components/organisms/add_modals/Add_Rol_Modal";
import { mockData } from "../../mock_data/empleados";
import { Toast } from "../../components/atoms/notification/Toast";
import { useRouter } from "next/router";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Empleados: NextPage = () => {
  const router = useRouter();
  const [empleadoModalOpen, setEmpleadoModalOpen] = useState(false);
  const [rolModalOpen, setRolModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const search =
    typeof router.query.search === "string" ? router.query.search : "";
  const rol =
    typeof router.query.roles === "string" ? router.query.roles : null;

  const handleRolSelect = (rolSelected: string) => {
    const isSame = rol === rolSelected;
    const newRol = isSame ? undefined : rolSelected;

    router.replace({
      pathname: "/empleados",
      query: {
        ...router.query,
        roles: newRol,
      },
    });
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
    if (!search.trim()) return;

    const filtered = mockData.empleados.filter((empleado) =>
      empleado.name.toLowerCase().includes(search.toLowerCase())
    );

    const uniqueRoles = [...new Set(filtered.map((e) => e.role))];

    const params = new URLSearchParams();
    params.set("search", search);

    if (uniqueRoles.length === 1) {
      const detectedRol = uniqueRoles[0];
      params.set("roles", detectedRol);
    } else if (router.query.roles) {
      params.set("roles", router.query.roles as string);
    }

    if (filtered.length === 1) {
      const empleado = filtered[0];
      const name = empleado.name;
      const role = empleado.role;
      params.set("search", name);
      params.set("roles", role);
    }

    const newUrl = `/empleados?${params.toString()}`;
    const currentUrl = router.asPath;

    if (currentUrl !== newUrl) {
      router.replace(newUrl);
    }
  }, [search]);

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
        (!rol || empleado.role === rol) &&
        (!search || empleado.name.toLowerCase().includes(search.toLowerCase()))
    )
    .map((empleado) => ({
      name: empleado.name,
      role: empleado.role,
      phone: empleado.phone,
      imageUrl: empleado.imageUrl,
      email: empleado.email, // Include the email property
    }));

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Roles_Empleados_List
            categories={rolesFormatted}
            onCategorySelect={handleRolSelect}
            onAddCategory={handleOpenRolModal}
            selectedCategory={rol}
          />
          <Empleados_List
            key={rol || search || "all"}
            empleado={empleadosFormatted}
            onAddEmpleado={handleAddEmpleado}
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
        <Add_Rol_Modal
          onClose={handleCloseRolModal}
          onSubmit={handleRolSubmit}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} visible={false} />
      )}
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
