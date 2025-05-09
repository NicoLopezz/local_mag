import { FC } from "react";
import { Card_Base } from "@/components/atoms/cards/Card_Base";

interface Props {
  title: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  stock?: number;
  isSelected?: boolean;
  onSelect?: (title: string) => void;
}

export const Category_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  href,
  stock,
  isSelected = false,
  onSelect,
}) => {
  return (
    <Card_Base
      title={title}
      description={description}
      imageUrl={imageUrl}
      stock={stock}
      isSelected={isSelected}
      onClick={onSelect ? () => onSelect(title) : undefined}
    />
  );
};
