import { FC, useState } from "react";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Service_Detalles } from "./Service_Detalles";
import { Service_Asignaciones } from "./Service_Asignaciones";
import { Service_Métricas } from "./Service_Metricas";

interface Props {
  onClose: () => void;
}

export const Service_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Detalles");

  return (
    <Base_Details_Modal
      tabs={["Detalles", "Asignaciones", "Métricas"]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={onClose}
    >
      {activeTab === "Detalles" && <Service_Detalles />}
      {activeTab === "Asignaciones" && <Service_Asignaciones />}
      {activeTab === "Métricas" && <Service_Métricas />}
    </Base_Details_Modal>
  );
};
