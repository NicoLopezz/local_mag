import { FC, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Empleado_Detalles } from "./Empleado_Detalles";
import { Empleado_Contacto } from "./Empleado_Contacto";
import { mockData } from "@/mock_data/empleados";

interface Props {
  onClose: () => void;
}

export const Empleado_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Detalles");

  const { query } = useRouter();
  const email = typeof query.email === "string" ? query.email : "";
  const empleado = mockData.empleados.find((e) => e.email === email);

  return (
    <Base_Details_Modal
      tabs={["Detalles", "Contacto"]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={onClose}
      imageSlot={
        empleado && (
          <Image
            src={empleado.imageUrl}
            alt={empleado.name}
            width={400}
            height={400}
            style={{borderRadius: "20px" , objectFit: "cover" }}
          />
        )
      }
    >
      {activeTab === "Detalles" && <Empleado_Detalles />}
      {activeTab === "Contacto" && <Empleado_Contacto />}
    </Base_Details_Modal>
  );
};
