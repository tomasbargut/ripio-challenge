import React from 'react';
import { Table, TableContainer, TableBody, TableHead, TableCell, TableRow, Paper } from '@material-ui/core';
import { Transaccion } from '../../../types/Transaccion';
import { useAuth } from '../../../contexts/AuthContext';
import { TransaccionDescripcion } from './TransaccionDescripcion';
import { TransaccionRow } from './TransaccionRow';
import { Cuenta } from '../../../types/User';
import { EmojiSymbolsRounded } from '@material-ui/icons';

export type TranssaccionTableProps = {
  transacciones: Transaccion[]
  cuenta: Cuenta
}

export const TransaccionTable = ({ transacciones, cuenta }: TranssaccionTableProps) => {
  const { user } = useAuth();
  const id = user?.id;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Detalle</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="right" >Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacciones.map((transaccion) => {
            return <TransaccionRow key={transaccion.id} flujo={transaccion.emisor == cuenta.id} transaccion={transaccion} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
