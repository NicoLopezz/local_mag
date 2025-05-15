import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Categories_Servicios_List } from "../../components/organisms/lists/Categories_Servicios_List";
import { Servicios_List } from "../../components/organisms/lists/Servicios_List";
import { Add_Servicio_Modal } from "../../components/organisms/add_modals/Add_Servicio_Modal";
import { Add_Category_Modal } from "../../components/organisms/add_modals/Add_Category_Modal";
import { mockData } from "../../mock_data/servicios";
import { Toast } from "../../components/atoms/notification/Toast";
import { useRouter } from "next/router";


const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Servicios: NextPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [servicioModalOpen, setServicioModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const search = typeof router.query.search === "string" ? router.query.search : "";
  const serivicio = typeof router.query.serivicio === "string" ? router.query.serivicio : null;

  const handleCategorySelect = (category: string) => {
    const isSame = serivicio === category;
    const newCategory = isSame ? undefined : category;

    router.replace({
      pathname: "/servicios",
      query: {
        ...router.query,
        serivicio: newCategory,
      },
    });
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
    if (!search.trim()) return;

    const filtered = mockData.services.filter((service) =>
      service.title.toLowerCase().includes(search.toLowerCase())
    );

    const uniqueCategories = [...new Set(filtered.map((s) => s.category))];

    const params = new URLSearchParams();
    params.set("search", search);

    if (uniqueCategories.length === 1) {
      const detectedCategory = uniqueCategories[0];
      params.set("serivicio", detectedCategory);
    } else if (router.query.serivicio) {
      params.set("serivicio", router.query.serivicio as string);
    }

    if (filtered.length === 1) {
      const service = filtered[0];
      const title = service.title;
      const category = service.category;
      params.set("search", title);
      params.set("serivicio", category);
    }

    const newUrl = `/servicios?${params.toString()}`;
    const currentUrl = router.asPath;

    if (currentUrl !== newUrl) {
      router.replace(newUrl);
    }
  }, [search]);

  const categoriesFormatted = mockData.categories.map((category) => ({
    title: category.title,
    description: category.description,
    // imageUrl: category.imageUrl, // Removed as it does not exist on the type
    href: category.href,
  }));

  const servicesFormatted = mockData.services
    .filter(
      (service) =>
        (!serivicio || service.category === serivicio) &&
        (!search || service.title.toLowerCase().includes(search.toLowerCase()))
    )
    .map((service) => ({
      title: service.title,
      description: service.description,
      // imageUrl: service.imageUrl,
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
            selectedCategory={serivicio}
          />
          <Servicios_List
            key={serivicio || search || "all"}
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
