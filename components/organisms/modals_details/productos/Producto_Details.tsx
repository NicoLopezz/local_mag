import { FC, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Base_Details_Modal } from "../Base_Details_Modal";
import { Producto_Detalles } from "./Producto_Detalles";
import { Producto_Stock } from "./Producto_Stock";
import { Producto_Proveedores } from "./Producto_Proveedores";
import { Producto_Metricas } from "./Producto_Metricas";
import { Producto_Historial } from "./Producto_Historial";
import { mockData } from "@/mock_data/products";
import { useLang } from "@/context/Language_Context";

interface Props {
  onClose: () => void;
}

export const Producto_Detail: FC<Props> = ({ onClose }) => {
  const { query } = useRouter();
  const productCode = typeof query.productCode === "string" ? query.productCode : "";
  const producto = mockData.products.find((p) => p.productCode === productCode);
  const { t } = useLang();

  const TABS = [
    { id: "detalles", label: t.modals.productos.tabs.detalles },
    { id: "stock", label: t.modals.productos.tabs.stock },
    { id: "proveedores", label: t.modals.productos.tabs.proveedores },
    { id: "metricas", label: t.modals.productos.tabs.metricas },
    { id: "historial", label: t.modals.productos.tabs.historial }
  ];

  const [activeTab, setActiveTab] = useState("detalles");

  const handleOpenDetailsFromStock = () => {
    setActiveTab("detalles");
  };

  return (
    <Base_Details_Modal
      tabs={TABS.map(tab => tab.label)}
      activeTab={TABS.find(tab => tab.id === activeTab)?.label || ""}
      onTabChange={(label) => {
        const tab = TABS.find(tab => tab.label === label);
        if (tab) setActiveTab(tab.id);
      }}
      onClose={onClose}
      imageSlot={
        producto && (
          <Image
            src={producto.imageUrl}
            alt={producto.title}
            width={520}
            height={520}
            style={{ objectFit: "contain" }}
          />
        )
      }
    >
      {activeTab === "detalles" && <Producto_Detalles />}
      {activeTab === "stock" && (
        <Producto_Stock
          onCloseModal={onClose}
          onOpenDetailsModal={handleOpenDetailsFromStock}
        />
      )}
      {activeTab === "proveedores" && <Producto_Proveedores />}
      {activeTab === "metricas" && <Producto_Metricas />}
      {activeTab === "historial" && <Producto_Historial />}
    </Base_Details_Modal>
  );
};
