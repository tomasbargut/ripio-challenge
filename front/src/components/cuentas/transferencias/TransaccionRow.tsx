import { TableCell, TableRow } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { Transaccion } from '../../../types/Transaccion';
import { Cuenta } from '../../../types/User';
import { TransaccionDescripcion } from './TransaccionDescripcion';

export type TransaccionRowProps = {
  transaccion: Transaccion,
  flujo: boolean
}

export const TransaccionRow = ({ transaccion, flujo }: TransaccionRowProps) => {
  const [emisorR] = useAxios<Cuenta>(`/core/cuenta/${transaccion.emisor}`);
  const [receptorR] = useAxios<Cuenta>(`/core/cuenta/${transaccion.receptor}`);
  const emisor = emisorR.data;
  const receptor = receptorR.data
  return <TableRow key={transaccion.id}>
    {emisor && receptor && <TransaccionDescripcion emisor={emisor} receptor={receptor} />}
    <TableCell>{transaccion.fecha}</TableCell>
    <TableCell align="right" >{flujo && "-"} ${transaccion.monto}</TableCell>
  </TableRow>
}