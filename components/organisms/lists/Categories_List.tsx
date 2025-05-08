import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { Category_Card } from "../../molecules/cards/Category_Card";
import { Add_Category_Card } from "../../molecules/cards/Add_Category_Card";
import { useLang } from "@/context/Language_Context";
import { Divider } from "@/components/atoms/Divider";

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

export const Category_List: FC<Props> = ({
  categories,
  onCategorySelect,
  onAddCategory,
  selectedCategory,
}) => {
  const { t } = useLang();

  return (
    <Container>
      <Title>{t.productos.pageTitle}</Title>
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
  font-size: ${({ theme }) => theme.fontSizes.title * 0.8}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  margin-bottom: 10px;
`;

const Categories_Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding-block: 0.75rem;
  gap: 1.25rem;
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
  &:hover {
    scrollbar-color: hsl(0 0% 80% / 0.2) transparent;
  }
  @media (hover: hover) {
    &::-webkit-scrollbar {
      height: 0.25rem;
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: hsl(0 0% 70% / 0);
      border-radius: 1rem;
      transition: background 0.3s ease;
    }
    
    &:hover::-webkit-scrollbar-thumb {
      background: hsl(0 0% 70% / 0.5);
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Category_Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 0.5s ease;
`;
