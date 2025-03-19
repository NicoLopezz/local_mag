import { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { Category_List } from "../../components/organisms/categories_list/Categories_List";
import { Product_List } from "../../components/organisms/product_list/Products_List";
import { Navbar } from "../../components/organisms/navbar/Navbar";
import { Sidebar } from "../../components/organisms/sidebar/Sidebar";
import { mockData } from "../../mock_data/products";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

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
  margin-left: calc(${Sidebar_Width});
`;

const Categories: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
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
      (product) => !selectedCategory || product.category === selectedCategory
    )
    .map((product) => ({
      title: product.title,
      description: product.description,
      imageUrl: "/images/default.jpg",
      href: "#",
      productCode: `SKU-${product.id}`,
      stock: product.stock,
    }));

  return (
    <Page_Container>
      <Navbar userName="Matías" userImage="/images/profile.jpg" />
      <Sidebar />
      <Main_Content>
        <Content_Area>
          <Category_List
            categories={categoriesFormatted}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <Product_List products={productsFormatted} />
        </Content_Area>
      </Main_Content>
    </Page_Container>
  );
};

export default Categories;
