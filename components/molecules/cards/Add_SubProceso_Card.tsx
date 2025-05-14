import { FC } from "react";
import { useLang } from "@/context/Language_Context";
import { Add_Card_Base, Add_Icon, Add_Text } from "@/components/atoms/cards/Add_Card_Base";

interface Props {
  onAddSubProceso: () => void;
}

export const Add_SubProceso_Card: FC<Props> = ({ onAddSubProceso }) => {
  const {t} = useLang();
  return (
    <Add_Card_Base onClick={onAddSubProceso}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.subprocesses.addSubprocesses}</Add_Text>
    </Add_Card_Base>
  );
};
