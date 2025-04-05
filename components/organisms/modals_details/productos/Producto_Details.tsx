import { FC, useState } from "react";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Producto_Detalles } from "./Producto_Detalles";
import { Producto_Stock } from "./Producto_Stock";
import { Producto_Proveedores } from "./Producto_Proveedores";
import { Producto_Metricas } from "./Producto_Metricas";

interface Props {
  onClose: () => void;
}

export const Producto_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Detalles");

  return (
    <Base_Details_Modal
      tabs={["Detalles", "Stock", "Proveedores", "Métricas"]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={onClose}
    >
      {activeTab === "Detalles" && <Producto_Detalles />}
      {activeTab === "Stock" && <Producto_Stock />}
      {activeTab === "Proveedores" && <Producto_Proveedores />}
      {activeTab === "Métricas" && <Producto_Metricas />}
    </Base_Details_Modal>
  );
};
