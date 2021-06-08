import { Grid, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CuentaPage } from '../../types/User';
import { GoBackButton } from '../common';
import { CuentaItem } from './CuentaItem';
import { NuevaCuenta } from './NuevaCuenta';

export const CuentasList = () => {
  const { user } = useAuth();
  const [{ data, loading, error }, refetch] = useAxios<CuentaPage>(`/core/user/${user?.id}/cuenta/`);
  return (
    <Grid container spacing={3}>
      <GoBackButton />
      <Grid item md={12}>
        <Typography align="center" variant="h1">
          Bienvenido {user?.username}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography align="center" variant="subtitle1">
          Selecciona una de tus cuentas para operar
          </Typography>
      </Grid>
      <Grid container item md={12} spacing={3} justify="flex-start">
        {data?.results.map((cuenta) => <CuentaItem key={cuenta.id} cuenta={cuenta} />)}
        <NuevaCuenta onSubmitCuenta={refetch}/>
      </Grid>

    </Grid>
  )
}