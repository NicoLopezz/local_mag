import { FC } from "react";
import { useLang } from "@/context/Language_Context";
import { Add_Card_Base, Add_Icon, Add_Text } from "@/components/atoms/cards/Add_Card_Base";

interface Props {
  onAddProceso: () => void;
}

export const Add_Proceso_Card: FC<Props> = ({ onAddProceso }) => {

  const {t} = useLang();

  return (
    <Add_Card_Base onClick={onAddProceso}>
      <Add_Icon>+</Add_Icon>
      <Add_Text>{t.processes.addProcesses}</Add_Text>
    </Add_Card_Base>
  );
};

