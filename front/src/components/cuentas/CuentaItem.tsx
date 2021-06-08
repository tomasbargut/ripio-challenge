import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Cuenta, Moneda } from '../../types/User';
import { ButtonLink } from '../common';

export type CuentaItemProps = {
  cuenta: Cuenta
}

export const CuentaItem = ({ cuenta }: CuentaItemProps) => {
  const { url, path } = useRouteMatch();
  const [responseMoneda, ] = useAxios<Moneda>(`/core/moneda/${cuenta.moneda}`);
  const moneda = responseMoneda.data
  return (
    <Grid item md={3} sm={12}>
      <ButtonLink to={{pathname: `${path}${cuenta.id}`, state: cuenta}}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {moneda?.nombre}
            </Typography>
            <Typography variant="body2">
              Saldo: $ {cuenta.monto}
            </Typography>
          </CardContent>
        </Card>
      </ButtonLink>
    </Grid>
  )
}