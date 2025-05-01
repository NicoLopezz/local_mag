import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Category_List } from "../../components/organisms/lists/Categories_List";
import { Product_List_Stock } from "../../components/organisms/lists/Products_List_Stock";
import { Add_Product_Modal } from "../../components/organisms/add_modals/Add_Product_Modal";
import { Add_Category_Modal } from "../../components/organisms/add_modals/Add_Category_Modal";
import { mockData } from "../../mock_data/products";
import { useToast } from "@/context/Toast_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

const Productos: NextPage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const search =
    typeof router.query.search === "string" ? router.query.search : "";
  const category =
    typeof router.query.category === "string" ? router.query.category : null;

  const handleCategorySelect = (categorySelected: string) => {
    const isSame = category === categorySelected;
    const newCategory = isSame ? undefined : categorySelected;

    router.replace({
      pathname: "/productos",
      query: {
        ...router.query,
        category: newCategory,
      },
    });
  };

  const [productModalOpen, setProductModalOpen] = useState(false);
  const handleAddProduct = () => setProductModalOpen(true);
  const handleCloseProductModal = () => setProductModalOpen(false);

  const handleOpenCategoryModal = () => setCategoryModalOpen(true);
  const handleCloseCategoryModal = () => setCategoryModalOpen(false);

  const handleProductSubmit = () => {
    setProductModalOpen(false);
    showToast("Producto creado con éxito");
  };

  const handleCategorySubmit = () => {
    setCategoryModalOpen(false);
    showToast("Categoría creada con éxito");
  };

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
        (!category || product.category === category) &&
        (!search || product.title.toLowerCase().includes(search.toLowerCase()))
    )
    .map((product) => ({
      title: product.title,
      description: product.description,
      imageUrl: "/images/default.jpg",
      href: "#",
      productCode: product.productCode,
      stock: product.stock,
    }));

  useEffect(() => {
    if (!search.trim()) return;

    const filtered = mockData.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    const uniqueCategories = [...new Set(filtered.map((p) => p.category))];

    const params = new URLSearchParams();
    params.set("search", search);

    if (uniqueCategories.length === 1) {
      const detectedCategory = uniqueCategories[0];
      params.set("category", detectedCategory);
    } else if (router.query.category) {
      params.set("category", router.query.category as string);
    }

    if (filtered.length === 1) {
      const product = filtered[0];
      const newCode = product.productCode;
      params.set("productCode", newCode);
    }

    const newUrl = `/productos?${params.toString()}`;
    const currentUrl = router.asPath;

    if (currentUrl !== newUrl) {
      router.replace(newUrl);
    }
  }, [search]);

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Category_List
            categories={categoriesFormatted}
            onCategorySelect={handleCategorySelect}
            onAddCategory={handleOpenCategoryModal}
            selectedCategory={category}
          />
          <Product_List_Stock
            key={category || search || "all"}
            products={productsFormatted}
            onAddProduct={handleAddProduct}
            onTransactionCommit={(unitsSold, title) =>
              showToast(`${unitsSold} unidades de ${title} registradas`)
            }
          />
        </Content_Area>
      </Main_Content>

      {productModalOpen && (
        <Add_Product_Modal
          onClose={handleCloseProductModal}
          onSubmit={handleProductSubmit}
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

export default Productos;
