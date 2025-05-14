import { FC } from "react";
import { Card_Base } from "@/components/atoms/cards/Card_Base";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  isSelected: boolean;
  onSelect: (title: string) => void;
}


export const Category_Service_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  isSelected,
  onSelect,
}) => {
  return (
    <Card_Base
      title={title}
      description={description}
      imageUrl={imageUrl}
      isSelected={isSelected}
      onClick={() => onSelect(title)} stock={0}  />
  );
};
