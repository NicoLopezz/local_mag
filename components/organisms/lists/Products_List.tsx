import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Product_Card } from "../../molecules/cards/Product_Card";
import { Add_Product_Card } from "../../molecules/cards/Add_Product_Card";
import { Producto_Detail } from "../../organisms/modals_details/productos/Producto_Details";
import { useRouter } from "next/router";
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
  onTransactionCommit: (stock: number, title: string) => void;
}

export const Product_List: FC<Props> = ({ products, onAddProduct, onTransactionCommit }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProductTitle, setModalProductTitle] = useState("");
  const { t } = useLang();
  const selectedProductCode =
    typeof router.query.productCode === "string"
      ? router.query.productCode
      : null;

  const handleSelect = (productCode: string) => {
    const currentCode = router.query.productCode;
    const params = new URLSearchParams(router.query as Record<string, string>);

    const product = products.find((p) => p.productCode === productCode);

    if (currentCode === productCode) {
      params.delete("productCode");
    } else {
      params.set("productCode", productCode);
    }

    router.replace(`/products?${params.toString()}`);

    if (product && currentCode !== productCode) {
      setModalProductTitle(product.title);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Container>
        <Title>{t.productos.subTitle}</Title>
        <Divider />
        <Products_Container>
          <Product_Wrapper>
            <Add_Product_Card onAddProduct={onAddProduct} />
          </Product_Wrapper>
          {products.map((product, index) => (
            <Product_Wrapper key={index}>
              <Product_Card
              category={""} {...product}
              isSelected={selectedProductCode === product.productCode}
              onSelect={handleSelect}
              onTransactionCommit={onTransactionCommit}
              />
            </Product_Wrapper>
          ))}
        </Products_Container>
      </Container>

      {modalOpen && (
        <Producto_Detail
          // title={modalProductTitle}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
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
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const Products_Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: auto;
  max-height: 300px;
  padding: 10px 0;
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

const Product_Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 0.5s ease;
`;
