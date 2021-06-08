import { TableCell } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { Cuenta, User } from '../../../types/User';

export type TransaccionDescripccionProps = {
  emisor: Cuenta,
  receptor: Cuenta
}

export const TransaccionDescripcion = ({ emisor, receptor }: TransaccionDescripccionProps) => {
  // const [emisorResponse,] = useAxios<User>(`/core/user/${emisor.user}/`);
  // const [receptorResponse,] = useAxios<User>(`/core/user/${receptor.user}/`);
  
  const emisorUser = emisor.user;
  const receptorUser = receptor.user;

  return <TableCell>
    {emisorUser && receptorUser && <>Transferencia de {emisorUser.username} a {receptorUser.username}</>}
  </TableCell>
}