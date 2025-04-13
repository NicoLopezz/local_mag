import { FC } from "react";
import styled from "styled-components";
import { Sidebar_Item } from "../../molecules/sidebar/Sidebar_Item";
import { Sidebar_Item_Logo } from "../../molecules/sidebar/Sidebar_Item_Logo";
import { Sidebar_Item_Settings } from "../../molecules/sidebar/Sidebar_Item_Settings";
import {
  Productos_Icon,
  Servicios_Icon,
  Finanzas_Icon,
  Clientes_Icon,
  Procesos_Icon,
  Empleados_Icon,
  Informes_Icon,
  Tareas_Icon,
  Legales_Icon,
} from "@/components/atoms/icons/sidebar_icons";

export const Sidebar: FC = () => {
  const empresa = "Distribuidora RLL";

  return (
    <Sidebar_Container>
      {empresa && (
        <Sidebar_Item_Logo logo="/images/logo.png" alt="Local" empresa={empresa} />
      )}
      <Sidebar_Items_Wrapper>
        {sidebar_items.map((item, index) => (
          <Sidebar_Item key={index} icon={item.icon} text={item.text} href={item.href} />
        ))}
      </Sidebar_Items_Wrapper>
      <Sidebar_Item_Settings />
    </Sidebar_Container>
  );
};

const Sidebar_Container = styled.aside`
  width: 6rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10002;
`;

const Sidebar_Items_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;

const sidebar_items = [
  { icon: <Productos_Icon />, text: "Productos", href: "/productos" },
  { icon: <Servicios_Icon />, text: "Servicios", href: "/servicios" },
  { icon: <Finanzas_Icon />, text: "Finanzas", href: "/finanzas" },
  { icon: <Clientes_Icon />, text: "Clientes", href: "/clientes" },
  { icon: <Procesos_Icon />, text: "Procesos", href: "/procesos" },
  { icon: <Empleados_Icon />, text: "Empleados", href: "/empleados" },
  { icon: <Informes_Icon />, text: "Informes", href: "/informes" },
  { icon: <Tareas_Icon />, text: "Tareas", href: "/tareas" },
  { icon: <Legales_Icon />, text: "Legales", href: "/legales" }
];
