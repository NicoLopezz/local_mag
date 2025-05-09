import { FC } from "react";
import { useLang } from "@/context/Language_Context";
import { Add_Card_Base, Add_Icon, Add_Text } from "@/components/atoms/cards/Add_Card_Base";

interface Props {
  onAddProduct: () => void;
}

export const Add_Product_Card: FC<Props> = ({ onAddProduct }) => {
  const { t } = useLang();

  return (
    <Add_Card_Base onClick={onAddProduct}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.productos.addProduct}</Add_Text>
    </Add_Card_Base>
  );
};
