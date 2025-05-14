import { FC } from "react";
import styled from "styled-components";
import { Item } from "../../molecules/sidebar/Sidebar_Item";
import { useLang } from "@/context/Language_Context";
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
  const { t } = useLang();
  const empresa = "Distribuidora Sur S.A.";

  const sidebar_items = [
    { icon: <Productos_Icon />, text: t.sidebar.productos, href: "/products" },
    { icon: <Servicios_Icon />, text: t.sidebar.servicios, href: "/services" },
    { icon: <Finanzas_Icon />, text: t.sidebar.finanzas, href: "/finances" },
    { icon: <Clientes_Icon />, text: t.sidebar.clientes, href: "/customers" },
    { icon: <Procesos_Icon />, text: t.sidebar.procesos, href: "/processes" },
    { icon: <Empleados_Icon />, text: t.sidebar.empleados, href: "/employees" },
    { icon: <Informes_Icon />, text: t.sidebar.pedidos, href: "/orders" },
    { icon: <Tareas_Icon />, text: t.sidebar.tareas, href: "/tasks" },
    { icon: <Legales_Icon />, text: t.sidebar.legales, href: "/legal" },
    { icon: <Stock_Icon />, text: t.sidebar.stock, href: "/stock" },
    { icon: <Envios_Icon />, text: t.sidebar.envios, href: "/shipments" },
    { icon: <Setings_Icon />, text: t.sidebar.settings, href: "/settings" },
  ];

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
  width: 7rem;
  height: calc(100vh - 4rem);
  position: fixed;
  top: 4rem;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.background};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  gap: 0.5rem;
  padding-bottom: 2rem;
`;
