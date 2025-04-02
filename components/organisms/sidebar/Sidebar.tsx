import { FC } from "react";
import styled from "styled-components";
import { Sidebar_Item } from "../../molecules/sidebar/Sidebar_Item";
import { Sidebar_Item_Logo } from "../../molecules/sidebar/Sidebar_Item_Logo";
import { Sidebar_Item_Settings } from "../../molecules/sidebar/Sidebar_Item_Settings";
import { FiUsers, FiUserCheck, FiFileText, FiRefreshCcw, FiBox, FiZap, FiTrendingUp } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";

export const Sidebar: FC = () => {
  const empresa = "Distribuidora RLL"; 

  return (
    <Sidebar_Container>
      {empresa && (
        <Sidebar_Item_Logo logo="/images/logo2.png" alt="Local" empresa={empresa} />
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
  { icon: <FiBox />, text: "Productos", href: "/productos" },
  { icon: <FiZap />, text: "Servicios", href: "/servicios" },
  { icon: <FiTrendingUp />, text: "Finanzas", href: "/finanzas" },
  { icon: <FiUsers />, text: "Clientes", href: "/clientes" },
  { icon: <FiRefreshCcw />, text: "Procesos", href: "/procesos" },
  { icon: <FiUserCheck />, text: "Empleados", href: "/empleados" },
  { icon: <FiFileText />, text: "Informes", href: "/informes" },
  { icon: <FaBalanceScale />, text: "Legales", href: "/legales" }
];
