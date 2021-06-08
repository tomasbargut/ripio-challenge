import { Grid, IconButton, Dialog, DialogTitle, Typography, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ValidationError } from '../../types/Common';
import { Cuenta, Moneda, MonedaPage as MonedaPage } from '../../types/User';

const filter = createFilterOptions<Moneda>();
export type NuevaCuentaProps = {
  onSubmitCuenta: () => void
}

export const NuevaCuenta = ({ onSubmitCuenta }: NuevaCuentaProps) => {

  const { user } = useAuth();
  const [openPop, setOpenPop] = useState(false);
  const [moneda, setMoneda] = useState<Moneda | null>(null);
  const [resp, refresh] = useAxios<MonedaPage>('/core/moneda');
  const [, execMoneda] = useAxios<Moneda>({ url: '/core/moneda/', method: "POST" }, { manual: true });
  const [, execCuenta] = useAxios({ url: `/core/user/${user?.id}/cuenta/`, method: "POST" }, { manual: true });
  const [error, setError] = useState<ValidationError | null>(null);

  const cleanUp = () => {
    setError(null);
  }
  const togglePop = () => {
    setOpenPop(prev => !prev);
  }

  const onSumbit = async () => {
    cleanUp();
    let payloadMoneda = moneda;
    if(moneda == null) {
      setError({error: true, helperText: "Debes de elejir una moneda"})
      return
    }
    console.log(moneda)
    if (!(moneda?.id)) {
      try {
        const { data } = await execMoneda({ data: { nombre: moneda?.nombre } });
        payloadMoneda = data;
      } catch (e) {
        console.log(e)
        return;
      }
    }
    try {
      const cuenta = await execCuenta({ data: { moneda: payloadMoneda?.id } })
    } catch (e) {
      console.log(e)
      return;
    }
    cleanUp()
    
    
    setMoneda(null);
    togglePop();
    refresh()
    onSubmitCuenta()
  }
  return <Grid item md={3} xs={12}>
    <IconButton onClick={togglePop} aria-describedby="new-cuenta">
      <Add />
    </IconButton>
    <Dialog open={openPop} onClose={togglePop}>
      <DialogTitle>
        Nueva cuenta
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Elige la moneda en la que crear la cuenta nueva
        </DialogContentText>
        {resp.data &&
          <Autocomplete
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            value={moneda}
            options={resp.data.results}
            getOptionLabel={(option) => {
              if (option.id) {
                return option.nombre
              } else {
                return `Agregar "${option.nombre}"`
              }
            }}
            onChange={(e, v) => {
              if (!(typeof v == "string")) {
                setMoneda(v)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push({
                  nombre: params.inputValue,
                  id: 0,
                });
              }
              return filtered;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Moneda" {...error} />
            )} />
        }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSumbit}>Crear</Button>
      </DialogActions>
    </Dialog>
  </Grid>
}