import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Product_Card } from "../../molecules/cards/Product_Card";
import { Add_SubProceso_Card } from "../../molecules/cards/Add_SubProceso_Card";
import { useLang } from "@/context/Language_Context";
import { Divider} from "@/components/atoms/Divider";

interface Product {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  productCode: string;
  stock: number;
}

interface Props {
  products: Product[];
  onAddProduct: () => void;
}

export const SubProceos_List: FC<Props> = ({ products, onAddProduct }) => {
  const [selectedProductCode, setSelectedProductCode] = useState<string | null>(null);
  const {t} = useLang();
  const handleSelect = (productCode: string) => {
    setSelectedProductCode((prev) => (prev === productCode ? null : productCode));

  };

  return (
    <Container>
      <Title>{t.subprocesses.title}</Title>
      <Divider />
      <Products_Container>
        <Product_Wrapper>
          <Add_SubProceso_Card onAddSubProceso={onAddProduct} />
        </Product_Wrapper>
        {products.map((product, index) => (
          <Product_Wrapper key={index}>
            <Product_Card
            category={""} onTransactionCommit={function (decrease: number, title: string): void {
              throw new Error("Function not implemented.");
            } } {...product}
            isSelected={selectedProductCode === product.productCode}
            onSelect={handleSelect}            />
          </Product_Wrapper>
        ))}
      </Products_Container>
    </Container>
  );
};

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

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: -10px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.title * 0.8}px;
`;

const Products_Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: auto;
  max-height: 300px;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  justify-content: flex-start;
  align-items: stretch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;

const Product_Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 0.5s ease;
`;
