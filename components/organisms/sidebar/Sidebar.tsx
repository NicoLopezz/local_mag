

import { FC } from "react";
import styled from "styled-components";
import { Sidebar_Item } from "../../molecules/sidebar/Sidebar_Item";
import { Sidebar_Item_Logo } from "../../molecules/sidebar/Sidebar_Item_Logo";
import { Sidebar_Item_Settings } from "../../molecules/sidebar/Sidebar_Item_Settings";
import { FiUsers, FiBriefcase, FiFileText, FiShield, FiBox, FiTool, FiTrendingUp, FiLayers } from "react-icons/fi";

const Sidebar_Container = styled.aside`
  width: 7rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10001;
`;

const Sidebar_Items_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
  align-items: center; 
`;

const sidebar_items = [
    { icon: <FiBox />, text: "Producto" },
    { icon: <FiTool />, text: "Servicio" },
    { icon: <FiTrendingUp />, text: "Finanzas" },
    { icon: <FiUsers />, text: "Clientes" },
    { icon: <FiLayers />, text: "Procesos" },
    { icon: <FiBriefcase />, text: "Empleados" },
    { icon: <FiFileText />, text: "Informe" },
    { icon: <FiShield />, text: "Legales" }
];

export const Sidebar: FC = () => {
  return (
    <Sidebar_Container>
      <Sidebar_Item_Logo logo="/logo.png" alt="Empresa" />
      <Sidebar_Items_Wrapper>
        {sidebar_items.map((item, index) => (
          <Sidebar_Item key={index} icon={item.icon} text={item.text} />
        ))}
      </Sidebar_Items_Wrapper>
      <Sidebar_Item_Settings />
    </Sidebar_Container>
  );
};
