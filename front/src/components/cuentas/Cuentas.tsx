import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { LoginRequired } from '../../contexts/AuthContext';
import { CuentaDetail } from './CuentaDetail';
import { CuentasList } from './CuentasList';

export default function Cuentas() {
  let { path, url } = useRouteMatch();

  return (
    <LoginRequired>
      <Switch>
        <Route exact path={path}>
          <CuentasList />
        </Route>
        <Route path={`${path}:cuentaId/`}>
          <CuentaDetail />
        </Route>
      </Switch>
    </LoginRequired>
  )
}