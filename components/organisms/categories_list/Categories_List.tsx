import { FC } from "react";
import styled from "styled-components";
import { Category_Card } from "../../molecules/Categories/Category_Card";
import { Add_Category_Card } from "../../molecules/Categories/Add_Category_Card";

interface Category {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  stock: number;
}

interface Props {
  categories: Category[];
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 15px;
`;

const Categories_Container = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 10px 0;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;

const Category_Wrapper = styled.div`
  flex: 0 0 calc(100% / 6 - 16px);
  max-width: calc(100% / 6 - 16px);
`;

const handleAddCategory = () => {
  alert("Agregar nueva categoría");
};


export const Category_List: FC<Props> = ({ categories }) => {
  return (
    <Container>
      <Title>Categorías</Title>
      <Divider />
      <Categories_Container>
      <Add_Category_Card onAddCategory={handleAddCategory} />
        {categories.map((category, index) => (
          <Category_Wrapper key={index}>
            <Category_Card {...category} />
          </Category_Wrapper>
        ))}
      </Categories_Container>
    </Container>
  );
};
