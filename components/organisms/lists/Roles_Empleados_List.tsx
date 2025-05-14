import { FC } from "react";
import styled from "styled-components";
import { Role_Card } from "../../molecules/cards/Role_Card";
import { Add_Role_Card } from "../../molecules/cards/Add_Role_Card";
import { useLang } from "@/context/Language_Context";
import { Divider} from "@/components/atoms/Divider";

interface Role {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  empleados: number;
}

interface Props {
  categories: Role[];
  onCategorySelect: (role: string) => void;
  onAddCategory: () => void;
  selectedCategory?: string | null;
}

export const Roles_Empleados_List: FC<Props> = ({
  categories,
  onCategorySelect,
  onAddCategory,
  selectedCategory,
}) => {

  const { t } = useLang();

  return (
    <Container>
      <Title>{t.roles.title}</Title>
      <Divider />
      <Roles_Container>
        <Role_Wrapper>
          <Add_Role_Card onAddRole={onAddCategory} />
        </Role_Wrapper>
        {categories.map((role, index) => (
          <Role_Wrapper key={index}>
            <Role_Card
              {...role}
              isSelected={selectedCategory === role.title}
              onSelect={() => onCategorySelect(role.title)}
            />
          </Role_Wrapper>
        ))}
      </Roles_Container>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 1rem;
  margin-right: 10px
`;

const Title = styled.h2`
font-weight: bold;
margin-bottom: 10px;
color: ${({ theme }) => theme.colors.title};
font-size: ${({ theme }) => theme.fontSizes.title * 0.8}px;
`;


const Roles_Container = styled.div`
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

const Role_Wrapper = styled.div``;
