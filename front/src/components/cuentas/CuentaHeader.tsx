import { Grid, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Cuenta, Moneda } from '../../types/User';

export type CuentaHeaderProps = {
  cuenta: Cuenta,
}

export const CuentaHeader = ({ cuenta }: CuentaHeaderProps) => {
  const [monedar,] = useAxios<Moneda>(`/core/moneda/${cuenta.moneda}`);
  const { user } = useAuth();

  const moneda = monedar.data;
  return (
    <>
      <Grid item lg={12}>
        <Typography variant="h1" align="center">
          Cuenta de {moneda?.nombre} de {user?.username}
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography variant="h2" align="center">
          $ {cuenta.monto}
        </Typography>
      </Grid>
    </>
  )
}