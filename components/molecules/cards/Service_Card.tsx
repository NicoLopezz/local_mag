import { FC } from "react";
import { Card_Base } from "@/components/atoms/cards/Card_Base";

interface Props {
  title: string;
  description?: string;
  imageUrl?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const Service_Card: FC<Props> = ({
  title,
  description,
  imageUrl,
  isSelected = false,
  onSelect,
}) => {
  return (
    <Card_Base
      title={title}
      description={description}
      imageUrl={imageUrl}
      isSelected={isSelected}
      onClick={onSelect}
    />
  );
};
