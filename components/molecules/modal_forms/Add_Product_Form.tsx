import { FC, useState } from "react";
import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface Props {
  onSubmit: (product: ProductInput) => void;
}

interface ProductInput {
  title: string;
  description: string;
  productCode: string;
  stock: number;
}

const Form_Title: FC<{ children: string }> = ({ children }) => {
  return <Styled_Title>{children}</Styled_Title>;
};

export const Add_Product_Form: FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    productCode: "",
    stock: ""
  });

  const { t } = useLang();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      description: form.description,
      productCode: form.productCode,
      stock: Number(form.stock)
    });
  };

  return (
    <Form_Container onSubmit={handleSubmit}>
      <Form_Title>{t.modals.productos.productForm.title}</Form_Title>
  
      <Styled_Input
        name="title"
        placeholder={t.modals.productos.productForm.nombre}
        value={form.title}
        onChange={handleChange}
        required
      />
      <Styled_Textarea
        name="description"
        placeholder={t.modals.productos.productForm.descripcion}
        value={form.description}
        onChange={handleChange}
        required
      />
      <Styled_Input
        name="productCode"
        placeholder={t.modals.productos.productForm.codigo}
        value={form.productCode}
        onChange={handleChange}
        required
      />
  
      <Form_Row>
        <Styled_Input_Stock
          name="stock"
          type="number"
          placeholder={t.modals.productos.productForm.stock}
          value={form.stock}
          onChange={handleChange}
          required
        />
        <Styled_Button type="submit">
          {t.modals.productos.productForm.guardar}
        </Styled_Button>
      </Form_Row>
    </Form_Container>
  );
  

};

const Form_Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const Form_Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  gap: 1rem;
`;

const Styled_Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: #555;
  }
`;

const Styled_Input_Stock = styled.input`
  padding: 0.75rem;
  width: 100px;
  min-width: 80px;
  max-width: 140px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: #555;
  }
`;


const Styled_Textarea = styled.textarea`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  outline: none;
  transition: border 0.2s;
  
  &::placeholder {
    font-family: 'YourFontFamily', sans-serif; 
    font-size: 1rem; 
    color: #888; 
  }

  &:focus {
    border-color: #555;
  }
`;


const Styled_Button = styled.button`
  flex: 1;
  background: #111;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 200;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #000;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const Styled_Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
