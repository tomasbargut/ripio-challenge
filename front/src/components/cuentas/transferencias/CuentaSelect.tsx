import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import useAxios from "axios-hooks"
import React, { useCallback, VoidFunctionComponent } from "react"
import { ValidationError } from "../../../types/Common"
import { Cuenta, CuentaPage, Moneda, User } from "../../../types/User"

export type CuentaSelectProps = {
  cuenta: Cuenta
  onChange: (e: React.ChangeEvent<{}>, value: Cuenta | null) => void,
  error?: ValidationError | null
}

export const CuentaSelect = ({ cuenta, onChange, error }: CuentaSelectProps) => {
  const [cuentasr,] = useAxios<CuentaPage>(`/core/cuenta/?moneda=${cuenta.moneda}&exclude=${cuenta.id}`);
  const cuentas = cuentasr.data?.results;
  console.log(cuentasr)
  return <>
    {cuentas && <Autocomplete
      id="user-box"
      options={cuentas}
      getOptionLabel={(option) => option.user.username}
      onChange={onChange}
      renderInput={(params) => <TextField  variant="outlined" {...params} {...error}/>}
    />}
  </>
}
