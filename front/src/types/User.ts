import { DrfPage } from "./Common";

export type User = {
  id: number;
  username: string;
};

export type Auth = {
  isLogged: Boolean;
  user?: User;
  login: (u: User) => void
};


export type Moneda = {
    id: number,
    nombre: string
}

export type Cuenta = {
    id: number,
    moneda: number,
    monto: number,
    user: User,
}

export type UserPage = DrfPage<User>;

export type CuentaPage = DrfPage<Cuenta>;

export type MonedaPage = DrfPage<Moneda>