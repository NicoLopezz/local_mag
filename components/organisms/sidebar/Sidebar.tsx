import { FC } from "react";
import styled from "styled-components";
import { Item } from "../../molecules/sidebar/Sidebar_Item";
import { Company_Logo } from "../../molecules/sidebar/Sidebar_Item_Logo";
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
  Stock_Icon,
  Envios_Icon,
  Setings_Icon,
} from "@/components/atoms/icons/sidebar_icons";

export const Sidebar: FC = () => {
  const empresa = "Distribuidora Sur S.A.";

  return (
    <Sidebar_Container>
      <List>
        {sidebar_items.map((item, index) => (
          <Item
            key={index}
            icon={item.icon}
            text={item.text}
            href={item.href}
          />
        ))}
      </List>
    </Sidebar_Container>
  );
};

const Sidebar_Container = styled.aside`
  width: 6rem;
  height: 90vh;
  position: fixed;
  top: 4rem;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  z-index: 999;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  font-size: 1.2rem;
`;

const sidebar_items = [
  { icon: <Productos_Icon />, text: "Productos", href: "/productos" },
  { icon: <Servicios_Icon />, text: "Servicios", href: "/servicios" },
  { icon: <Finanzas_Icon />, text: "Finanzas", href: "/finanzas" },
  { icon: <Clientes_Icon />, text: "Clientes", href: "/clientes" },
  { icon: <Procesos_Icon />, text: "Procesos", href: "/procesos" },
  { icon: <Empleados_Icon />, text: "Empleados", href: "/empleados" },
  { icon: <Informes_Icon />, text: "Pedidos", href: "/pedidos" },
  { icon: <Tareas_Icon />, text: "Tareas", href: "/tareas" },
  { icon: <Legales_Icon />, text: "Legales", href: "/legales" },
  { icon: <Stock_Icon />, text: "Stock", href: "/stock" },
  { icon: <Envios_Icon />, text: "Envios", href: "/envios" },
  { icon: <Setings_Icon />, text: "Settings", href: "/settings" },
];


