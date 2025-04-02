import { FC } from "react";
import styled from "styled-components";
import { Category_Card } from "../../molecules/cards/Category_Card";
import { Add_Category_Card } from "../../molecules/cards/Add_Category_Card";

interface Category {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  stock: number;
}

interface Props {
  categories: Category[];
  onCategorySelect: (category: string) => void;
  onAddCategory: () => void;
  selectedCategory?: string | null;
}

export const Categories_Servicios_List: FC<Props> = ({
  categories,
  onCategorySelect,
  onAddCategory,
  selectedCategory,
}) => {
  return (
    <Container>
      <Title>Categorías</Title>
      <Divider />
      <Categories_Container>
        <Category_Wrapper>
          <Add_Category_Card onAddCategory={onAddCategory} />
        </Category_Wrapper>
        {categories.map((category, index) => (
          <Category_Wrapper key={index}>
            <Category_Card
              {...category}
              isSelected={selectedCategory === category.title}
              onSelect={() => onCategorySelect(category.title)}
            />
          </Category_Wrapper>
        ))}
      </Categories_Container>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 1rem;
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
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  gap: 20px;
  

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;

const Category_Wrapper = styled.div`
  /* flex: 0 0 calc(100% / 6 - 16px);
  max-width: calc(100% / 6 - 16px); */
`;

