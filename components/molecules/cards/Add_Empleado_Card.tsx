import { FC } from "react";
import { useLang } from "@/context/Language_Context";
import { Add_Card_Base, Add_Icon, Add_Text } from "@/components/atoms/cards/Add_Card_Base";

interface Props {
  onAddRole: () => void;
}

export const Add_Empleado_Card: FC<Props> = ({ onAddRole }) => {
  const { t } = useLang();
  return (
    <Add_Card_Base onClick={onAddRole}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.empleados.addEmployee}</Add_Text>
    </Add_Card_Base>
  );
};

