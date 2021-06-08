import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import { Cuenta } from "../../../types/User";

export type DepositoMagicoProps = {
  cuenta: Cuenta,
  open: boolean,
  onClose: () => void
}

export const DepositoMagico = ({cuenta, open, onClose}: DepositoMagicoProps) => {
  const [monto, setMonto] = useState(0);
  const [, exec] = useAxios({url: `/core/user/${cuenta.user.id}/cuenta/${cuenta.id}/`, method: "PATCH"}, {manual: true});
  return (<Dialog open={open} onClose={onClose}>
    <DialogTitle id="form-dialog-title">Transferencia</DialogTitle>
    <DialogContent>
      <TextField label="Monto" fullWidth autoFocus type="number" onChange={(e) => { setMonto(parseInt(e.target.value)) }} />
    </DialogContent>
    <DialogActions>
      <Button onClick={async () => {
        try {
          await exec({data: {monto: cuenta.moneda + monto}});
        } catch (e) {}
        onClose()
      }}>Depositar</Button>
    </DialogActions>
  </Dialog>)
}