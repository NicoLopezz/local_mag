import React, { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useLang } from "@/context/Language_Context";

interface Props {
  onNumeroTarjetaChange: (value: string) => void;
  onVencimientoChange: (value: string) => void;
  onCodSeguridadChange: (value: string) => void;
  onNombreApellidoChange: (value: string) => void;
  numeroTarjeta: string;
  vencimiento: string;
  codSeguridad: string;
  nombreApellido: string;
}

export const TarjetaFormulario: FC<Props> = ({
  onNumeroTarjetaChange,
  onVencimientoChange,
  onCodSeguridadChange,
  onNombreApellidoChange,
  numeroTarjeta,
  vencimiento,
  codSeguridad,
  nombreApellido,
}) => {
  const { t } = useLang();
  
  return (
    <FormularioTarjeta>
      <Campo>
        <Label htmlFor="numeroTarjeta">{t.modals.productos.cobrarCard.numeroTarjeta}</Label>
        <Input
          type="text"
          id="numeroTarjeta"
          value={numeroTarjeta}
          onChange={(e) => onNumeroTarjetaChange(e.target.value)}
          placeholder={t.modals.productos.cobrarCard.placeholderNumero}
          maxLength={19}
        />
      </Campo>
      <FilaDoble>
        <CampoCorto>
          <Label htmlFor="vencimiento">{t.modals.productos.cobrarCard.vencimiento}</Label>
          <Input
            type="text"
            id="vencimiento"
            value={vencimiento}
            onChange={(e) => onVencimientoChange(e.target.value)}
            placeholder={t.modals.productos.cobrarCard.placeholderVencimiento}
            maxLength={5}
          />
        </CampoCorto>
        <CampoCorto>
          <Label htmlFor="codSeguridad">{t.modals.productos.cobrarCard.codSeguridad}</Label>
          <Input
            type="text"
            id="codSeguridad"
            value={codSeguridad}
            onChange={(e) => onCodSeguridadChange(e.target.value)}
            placeholder={t.modals.productos.cobrarCard.placeholderCod}
            maxLength={4}
          />
        </CampoCorto>
      </FilaDoble>
      <Campo>
        <Label htmlFor="nombreApellido">{t.modals.productos.cobrarCard.nombreApellido}</Label>
        <Input
          type="text"
          id="nombreApellido"
          value={nombreApellido}
          onChange={(e) => onNombreApellidoChange(e.target.value)}
          placeholder={t.modals.productos.cobrarCard.placeholderNombre}
        />
      </Campo>
      <Campo>
        <Label htmlFor="pagoConTarjeta">{t.modals.productos.cobrarCard.pagoConTarjeta}</Label>
        <Select id="pagoConTarjeta">
          <option value="">{t.modals.productos.cobrarCard.selectOption}</option>
        </Select>
      </Campo>
      <CampoCheckbox>
        <Checkbox type="checkbox" id="recordarTarjeta" />
        <LabelCheckbox htmlFor="recordarTarjeta">
          {t.modals.productos.cobrarCard.recordar}
        </LabelCheckbox>
      </CampoCheckbox>
    </FormularioTarjeta>
  );
  

};

const FormularioTarjeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const FilaDoble = styled.div`
  display: flex;
  gap: 1rem;
`;

const CampoCorto = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const CampoCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  /* Estilos para el checkbox */
`;

const LabelCheckbox = styled.label`
  font-size: 0.9rem;
`;