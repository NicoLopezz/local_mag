import type { NextPage } from "next";
import { Category_List } from "../../components/organisms/categories_list/Categories_List";
import { Product_List } from "../../components/organisms/product_list/Products_List";
import styled from "styled-components";
import { mockData } from "../../mock_data/products";

const Page_Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const Categories: NextPage = () => {
  const categoriesFormatted = mockData.categories.map((category) => ({
    title: category.title,
    description: category.description,
    imageUrl: category.imageUrl,
    href: category.href,
    stock: category.stock,
  }));

  const productsFormatted = mockData.products.map((product) => ({
    title: product.title,
    description: product.description,
    imageUrl: "/images/default.jpg",
    href: "#",
    productCode: `SKU-${product.id}`,
    stock: product.stock,
  }));

  return (
    <Page_Container>
      <Category_List categories={categoriesFormatted} />
      <Product_List products={productsFormatted} />
    </Page_Container>
  );
};

export default Categories;
