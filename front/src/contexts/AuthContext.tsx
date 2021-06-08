import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Auth, User } from "../types/User";

export const initialAuth: Auth = {
  isLogged: false,
  login: (u: User) => {}
};

export const AuthContext = React.createContext<Auth>(initialAuth);

export const AuthContextWrapper: React.FC<{}> = (props) => {
  const [user, setUser] = useState<User>();
  const [isLogged, setIsLogged] = useState<Boolean>(false);

  const login = (u: User) => {
    setUser(u)
    setIsLogged(true);
  }
  
  return <AuthContext.Provider value={{isLogged, user, login}}>
    {props.children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export const LoginRequired: React.FC = ({children}) => {
  const { isLogged } = useAuth();
  return <>
    {isLogged? children: <Redirect to="/login" />}
  </>
}