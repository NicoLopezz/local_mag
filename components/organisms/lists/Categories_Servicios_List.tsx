import { FC } from "react";
import styled from "styled-components";
import { Category_Service_Card } from "../../molecules/cards/Category_Service_Card";
import { Add_Category_Card } from "../../molecules/cards/Add_Category_Card";
import { useLang } from "@/context/Language_Context";
import { Divider} from "@/components/atoms/Divider";


interface Category {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
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
  const { t } = useLang();
  return (  
    <Container>
      <Title>{t.services.categories.title}</Title>
      <Divider />
      <Categories_Container>
        <Category_Wrapper>
          <Add_Category_Card onAddCategory={onAddCategory} />
        </Category_Wrapper>
        {categories.map((category, index) => (
          <Category_Wrapper key={index}>
            <Category_Service_Card
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
  color: ${({ theme }) => theme.colors.text};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #cccccc16;
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

const Category_Wrapper = styled.div``;
