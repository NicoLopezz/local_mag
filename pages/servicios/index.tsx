import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Categories_Servicios_List } from "../../components/organisms/lists/Categories_Servicios_List";
import { Servicios_List } from "../../components/organisms/lists/Servicios_List";
import { Add_Servicio_Modal } from "../../components/organisms/add_modals/Add_Servicio_Modal";
import { Add_Category_Modal } from "../../components/organisms/add_modals/Add_Category_Modal";
import { mockData } from "../../mock_data/servicios";
import { Toast } from "../../components/atoms/notification/Toast";
import { useSearch } from "../../context/Search_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Servicios: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [servicioModalOpen, setServicioModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { query } = useSearch();
  const hasSelectedManually = useRef(false);

  const handleCategorySelect = (category: string) => {
    hasSelectedManually.current = true;
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleAddServicio = () => setServicioModalOpen(true);
  const handleCloseServicioModal = () => setServicioModalOpen(false);

  const handleOpenCategoryModal = () => setCategoryModalOpen(true);
  const handleCloseCategoryModal = () => setCategoryModalOpen(false);

  const handleServicioSubmit = () => {
    setServicioModalOpen(false);
    setToastMessage("Servicio creado con éxito");
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

    const match = mockData.services.find((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
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
  }));

  const servicesFormatted = mockData.services
    .filter(
      (service) =>
        (!selectedCategory || service.category === selectedCategory) &&
        (!query || service.title.toLowerCase().includes(query.toLowerCase()))
    )
    .map((service) => ({
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
      href: service.href,
    }));

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Categories_Servicios_List
            categories={categoriesFormatted}
            onCategorySelect={handleCategorySelect}
            onAddCategory={handleOpenCategoryModal}
            selectedCategory={selectedCategory}
          />
          <Servicios_List
            key={selectedCategory || query || "all"}
            services={servicesFormatted}
            onAddServicio={handleAddServicio}
          />
        </Content_Area>
      </Main_Content>

      {servicioModalOpen && (
        <Add_Servicio_Modal
          onClose={handleCloseServicioModal}
          onSubmit={handleServicioSubmit}
        />
      )}
      {categoryModalOpen && (
        <Add_Category_Modal
          onClose={handleCloseCategoryModal}
          onSubmit={handleCategorySubmit}
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
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

export default Servicios;
