import { FC, useState } from "react";
import { useRouter } from "next/router"; 
import Image from "next/image";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Empleado_Contacto } from "./Empleado_Contacto";
import { mockData } from "@/mock_data/empleados";

interface Props {
  onClose: () => void;
  employeeName?: string | null;
}

export const Empleado_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Detalles");
  const { query } = useRouter();
  const emailFromQuery = typeof query.email === "string" ? query.email : null;

  const empleadoBase = mockData.empleados.find(
    (e) => e.email === emailFromQuery
  );

  const empleado = empleadoBase
    ? {
        surname: "Generado",
        age: Math.floor(Math.random() * 30 + 20),
        children: Math.floor(Math.random() * 3),
        address: "Calle Falsa 123",
        dni: (Math.floor(Math.random() * 100000000)).toString(),
        cuil: "20-" + Math.floor(Math.random() * 100000000) + "-0",
        category: "A",
        ...empleadoBase,
      }
    : null;

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
            style={{ borderRadius: "20px", objectFit: "cover" }}
          />
        )
      }
    >
      {activeTab === "Detalles" && empleado && (
        <Empleado_Contacto empleado={empleado} />
      )}
      {!empleado && (
        <div>No se encontró información para el empleado seleccionado.</div>
      )}
    </Base_Details_Modal>
  );
};
