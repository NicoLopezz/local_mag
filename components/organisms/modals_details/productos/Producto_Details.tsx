import { FC, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Producto_Detalles } from "./Producto_Detalles";
import { Producto_Stock } from "./Producto_Stock";
import { Producto_Proveedores } from "./Producto_Proveedores";
import { Producto_Metricas } from "./Producto_Metricas";
import { mockData } from "@/mock_data/products";

interface Props {
  onClose: () => void;
}

export const Producto_Detail: FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Detalles");
  const { query } = useRouter();
  const productCode = typeof query.productCode === "string" ? query.productCode : "";
  const producto = mockData.products.find((p) => p.productCode === productCode);

  return (
    <Base_Details_Modal
      tabs={["Detalles", "Stock", "Proveedores", "Métricas"]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={onClose}
      imageSlot={
        producto && (
          <Image
            src={producto.imageUrl}
            alt={producto.title}
            width={520}
            height={520}
            style={{ objectFit: "contain"}}
          />
        )
      }
    >
      {activeTab === "Detalles" && <Producto_Detalles />}
      {activeTab === "Stock" && <Producto_Stock />}
      {activeTab === "Proveedores" && <Producto_Proveedores />}
      {activeTab === "Métricas" && <Producto_Metricas />}
    </Base_Details_Modal>
  );
};
