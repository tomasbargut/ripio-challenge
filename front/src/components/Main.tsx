import { Container } from '@material-ui/core';
import Cuentas from './cuentas/Cuentas';
import UsuarioList from './usuario/UsuarioList';
import { Switch, BrowserRouter, Route } from "react-router-dom"

const Main = () => {

  // TODO: Replace for an api call
  return (
    <Container maxWidth="lg">
      <BrowserRouter >
        <Switch>
          <Route exact path="/login">
            <UsuarioList />
          </Route>
          <Route path="/">
            <Cuentas />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
};
export default Main;