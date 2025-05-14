import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Procesos_List } from "../../components/organisms/lists/Procesos_List";
import { SubProceos_List } from "../../components/organisms/lists/SubProceos_List";
import { Add_SubProceso_Modal } from "../../components/organisms/add_modals/Add_SubProceso_Modal";
import { Add_Proceso_Modal } from "../../components/organisms/add_modals/Add_Proceso_Modal";
import { mockData } from "../../mock_data/products";
import { Toast } from "../../components/atoms/notification/Toast";
import { useSearch } from "../../context/Search_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Productos: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { query } = useSearch();
  const hasSelectedManually = useRef(false);

  const handleCategorySelect = (category: string) => {
    hasSelectedManually.current = true;
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleAddProduct = () => setProductModalOpen(true);
  const handleCloseProductModal = () => setProductModalOpen(false);

  const handleOpenCategoryModal = () => setCategoryModalOpen(true);
  const handleCloseCategoryModal = () => setCategoryModalOpen(false);

  const handleProductSubmit = () => {
    setProductModalOpen(false);
    setToastMessage("Producto creado con éxito");
  };

  const handleCategorySubmit = () => {
    setCategoryModalOpen(false);
    setToastMessage("Categoría creada con éxito");
  };

  const handleCloseToast = () => setToastMessage(null);

  useEffect(() => {
    if (hasSelectedManually.current) return;
  
    if (query.trim() === "") {
      setSelectedCategory(null);
      return;
    }
  
    const match = mockData.products.find((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  
    if (match) {
      setSelectedCategory(match.category);
    } else {
      setSelectedCategory(null);
    }
  }, [query]);
  
  

  const categoriesFormatted = mockData.categories.map((category) => ({
    title: category.title,
    description: category.description,
    imageUrl: category.imageUrl,
    href: category.href,
    stock: category.stock,
  }));

  const productsFormatted = mockData.products
    .filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!query || product.title.toLowerCase().includes(query.toLowerCase()))
    )
    .map((product) => ({
      title: product.title,
      description: product.description,
      imageUrl: "/images/default.jpg",
      href: "#",
      productCode: product.productCode,
      stock: product.stock,
    }));

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Procesos_List
            categories={categoriesFormatted}
            onCategorySelect={handleCategorySelect}
            onAddCategory={handleOpenCategoryModal}
            selectedCategory={selectedCategory}
          />
          <SubProceos_List
            key={selectedCategory || query || "all"}
            products={productsFormatted}
            onAddProduct={handleAddProduct}
          />
        </Content_Area>
      </Main_Content>s

      {productModalOpen && (
        <Add_SubProceso_Modal
          onClose={handleCloseProductModal}
          onSubmit={handleProductSubmit}
        />
      )}
      {categoryModalOpen && (
        <Add_Proceso_Modal
          onClose={handleCloseCategoryModal}
          onSubmit={handleCategorySubmit}
        />
      )}
      {/* {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )} */}
    </Page_Container>
  );
};

const Page_Container = styled.div`

  display: flex;
  width: 100%;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  
  display: flex;
  overflow: hidden;
  padding: 0px;
  flex-grow: 1;
`;

const Content_Area = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: calc(100vw - ${Sidebar_Width});
  margin-left: 2rem;
`;

export default Productos;
