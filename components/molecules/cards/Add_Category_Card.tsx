import { FC } from "react";
import { useLang } from "@/context/Language_Context";
import { Add_Card_Base, Add_Icon, Add_Text } from "@/components/atoms/cards/Add_Card_Base";

interface Props {
  onAddCategory: () => void;
}

export const Add_Category_Card: FC<Props> = ({ onAddCategory }) => {
  const { t } = useLang();
  return (
    <Add_Card_Base onClick={onAddCategory}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.services.categories.addCategory}</Add_Text>
    </Add_Card_Base>
  );
};

interface Add_Card_Base {
  isSelected?: boolean;
}
