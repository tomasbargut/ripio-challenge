import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, IconButton, Modal, TextField, Typography } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { NuevaTransaccion, Transaccion } from '../../types/Transaccion';
import { Cuenta } from '../../types/User';
import { CuentaHeader } from './CuentaHeader';
import { TransaccionTable } from './transferencias/TransaccionTable';
import { TransferenciaDialog } from './transferencias/TransferenciaDialog';
import { GoBackButton } from '../common';
import { DepositoMagico } from './transferencias/DepositoMagico';

export const CuentaDetail = () => {
  const history = useHistory<Cuenta>()
  const { user } = useAuth();
  const [modalTrans, setModalTrans] = useState(false);
  const [cuenta, setCuenta] = useState({ ...history.location.state })

  const [response, refreshTrans] = useAxios(`/transaccion?cuenta=${cuenta.id}`);
  const [, fetchCuenta] = useAxios(`/core/user/${user?.id}/cuenta/${cuenta.id}`, { manual: true, useCache: false })
  const [, exec] = useAxios({ url: `/transaccion/`, method: 'POST' }, { manual: true });
  const [openDepos, setOpenDepos] = useState(false);
  const handleOpenTransModal = () => {
    setModalTrans(true);
  }
  const handleCloseTransModal = () => {
    setModalTrans(false);
  }
  const nuevaTransaccion = async (nt: NuevaTransaccion) => {
    const result = await exec({ data: nt });
    const { data } = await fetchCuenta();
    const cuenta = { ...data };
    console.log(cuenta)
    setCuenta(cuenta);
    refreshTrans()
  }

  const toggleDepo = () => {
    setOpenDepos(prev => !prev);
  }
  return (
    <Grid container spacing={3}>
      <GoBackButton />
      <CuentaHeader cuenta={cuenta} />
      <Grid container item spacing={3} lg={12}>
        <Grid item md={6}>
          <Typography align="center">
            <Button size="large" variant="contained" onClick={toggleDepo}>
              DEPOSITO MAGICO
            </Button>
            <DepositoMagico open={openDepos} cuenta={cuenta} onClose={() =>{toggleDepo(); fetchCuenta().then(r => {setCuenta(r.data)})}}/>
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography align="center">
            <Button size="large" variant="contained" onClick={handleOpenTransModal}>
              Transferir
            </Button>
          </Typography>
          <TransferenciaDialog emisor={cuenta} open={modalTrans} onClose={handleCloseTransModal}
            onSubmit={nuevaTransaccion} />
        </Grid>
      </Grid>
      {response.data && <TransaccionTable cuenta={cuenta} transacciones={response.data.results} />}
    </Grid>
  );
}