import React, { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

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
  return (
    <FormularioTarjeta>
      <Campo>
        <Label htmlFor="numeroTarjeta">Nº de tarjeta *</Label>
        <Input
          type="text"
          id="numeroTarjeta"
          value={numeroTarjeta}
          onChange={(e) => onNumeroTarjetaChange(e.target.value)}
          placeholder="**** **** **** ****"
          maxLength={19} // Máxima longitud de una tarjeta (incluyendo espacios)
        />
      </Campo>
      <FilaDoble>
        <CampoCorto>
          <Label htmlFor="vencimiento">Vencimiento *</Label>
          <Input
            type="text"
            id="vencimiento"
            value={vencimiento}
            onChange={(e) => onVencimientoChange(e.target.value)}
            placeholder="MM/AA"
            maxLength={5}
          />
        </CampoCorto>
        <CampoCorto>
          <Label htmlFor="codSeguridad">Cod. seguridad *</Label>
          <Input
            type="text"
            id="codSeguridad"
            value={codSeguridad}
            onChange={(e) => onCodSeguridadChange(e.target.value)}
            placeholder="CVV"
            maxLength={4} // Longitud común del CVV
          />
        </CampoCorto>
      </FilaDoble>
      <Campo>
        <Label htmlFor="nombreApellido">Nombre y apellido *</Label>
        <Input
          type="text"
          id="nombreApellido"
          value={nombreApellido}
          onChange={(e) => onNombreApellidoChange(e.target.value)}
          placeholder="Como aparece en la tarjeta"
        />
      </Campo>
      <Campo>
        <Label htmlFor="pagoConTarjeta">Pago con tarjeta *</Label>
        <Select id="pagoConTarjeta">
          <option value="">Seleccione un elemento</option>
          {/* Aquí podrías cargar tarjetas guardadas del usuario */}
        </Select>
      </Campo>
      <CampoCheckbox>
        <Checkbox type="checkbox" id="recordarTarjeta" />
        <LabelCheckbox htmlFor="recordarTarjeta">Recordar tarjeta</LabelCheckbox>
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