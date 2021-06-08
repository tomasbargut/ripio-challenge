import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useAxios from 'axios-hooks'
import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { ValidationError } from '../../../types/Common'
import { NuevaTransaccion } from '../../../types/Transaccion'
import { Cuenta, CuentaPage, Moneda, User, UserPage } from '../../../types/User'
import { CuentaSelect } from './CuentaSelect'

export type RealizarTransferenciaProps = {
  emisor: Cuenta,
  open: boolean,
  onClose: () => void,
  onSubmit: (transaccion: NuevaTransaccion) => Promise<void>
}


export const TransferenciaDialog = ({ emisor, open, onClose, onSubmit }: RealizarTransferenciaProps) => {
  const [monto, setMonto] = useState(0);
  const [errorMonto, setErrorMonto] = useState<ValidationError | null>(null);
  const [receptor, setReceptor] = useState<Cuenta | undefined | null>();
  const [errorCuenta, setErrorCuenta] = useState<ValidationError | null>(null);

  const cleanUp = () => {
    setErrorMonto(null);
    setErrorCuenta(null);
  }
  return (<Dialog open={open} onClose={() => { onClose(); cleanUp();}}>
    <DialogTitle id="form-dialog-title">Transferencia</DialogTitle>
    <DialogContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Monto" fullWidth autoFocus type="number" onChange={(e) => { setMonto(parseInt(e.target.value)) }} {...errorMonto} />
        </Grid>
        <Grid item xs={12}>
          <CuentaSelect cuenta={emisor} onChange={(e, v) => setReceptor(v)} error={errorCuenta} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={async () => {
        if (receptor && monto > 0) {
          try {
            await onSubmit({ monto, emisor: emisor.id, receptor: receptor.id });
          } catch (e) {
            console.error(e)
          } finally {
            setReceptor(null);
            setMonto(0)
            onClose();
            cleanUp()
          }
        } else {
          if (!monto || monto < 0) {
            setErrorMonto({ error: true, helperText: "El monto debe de ser mayor a cero" })
          } else {
          }
          if (!receptor) {
            setErrorCuenta({ error: true, helperText: "Debes ejelir un receptor" })
          }
        }
      }}>Transferir</Button>
    </DialogActions>
  </Dialog>)
}