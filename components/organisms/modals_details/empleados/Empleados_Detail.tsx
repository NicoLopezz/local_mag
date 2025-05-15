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
      ...empleadoBase,
      surname: "Generado",
      age: Math.floor(Math.random() * 30 + 20),
      children: Math.floor(Math.random() * 3),
      address: "Calle Falsa 123",
      dni: Math.floor(Math.random() * 100000000).toString(),
      cuil: "20-" + Math.floor(Math.random() * 100000000) + "-0",
      category: "A",
      legajo: "EMP-" + Math.floor(Math.random() * 10000),
      fechaIngreso: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3)
      ).toISOString().split("T")[0],
      tipoContrato: ["Indefinido", "Temporario", "Pasantía"][
        Math.floor(Math.random() * 3)
      ],
      salarioBase: Math.floor(Math.random() * 50000 + 30000),
      salarioNeto: Math.floor(Math.random() * 45000 + 25000),
      birthdate: new Date("1992-09-10"),
      obraSocial: ["OSDE", "Swiss Medical", "Galeno"][
        Math.floor(Math.random() * 3)
      ],
      art: ["ART 1", "ART 2", "ART 3"][Math.floor(Math.random() * 3)],
      puestoExacto: ["Operario Senior", "Analista Junior", "Supervisor"][
        Math.floor(Math.random() * 3)
      ],
      supervisor: "Juan Pérez",
      contactoEmergencia: {
        nombre: ["María Gómez", "Carlos Rodríguez", "Laura Fernández"][
          Math.floor(Math.random() * 3)
        ],
        relacion: ["Esposa", "Padre", "Hermano"][
          Math.floor(Math.random() * 3)
        ],
        telefono: "11" + Math.floor(Math.random() * 10000000 + 30000000),
      },
      vacaciones: {
        totalDias: 14,
        usados: Math.floor(Math.random() * 10),
        disponibles: 14 - Math.floor(Math.random() * 10),
      },
      equiposAsignados: [
        "Notebook",
        "Teléfono corporativo",
        "Herramientas especiales",
      ],
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
