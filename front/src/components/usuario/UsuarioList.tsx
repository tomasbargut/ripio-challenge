import { Button, Grid, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { User, UserPage } from '../../types/User';
import UsuarioSelector from './UsuarioSelector';

const users = [
  { id: 1, username: "Pedro" },
  { id: 2, username: "Pablo" }
];

const UsuarioList = () => {
  const [{ data, loading, error }, refetch] = useAxios<UserPage>('/core/user', {useCache: false});
  const [selectedUser, setSelectedUser] = useState<User | null | undefined>();
  const [, exec] = useAxios<User>({ url: '/core/user/', method: "POST" }, { manual: true })
  const history = useHistory();
  const { login } = useAuth();
  const onChange = (e: React.ChangeEvent<{}>, u: User | null | string) => {
    if (!(typeof u == 'string')) {
      setSelectedUser(u);
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          Ripio challenge
          </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center">
          Seleccione un usuario para ingresar
          </Typography>
      </Grid>

      <Grid item xs={12}>
        {data && <UsuarioSelector onChange={onChange} users={data.results} />}
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          <Button variant="contained" color="primary" size="large" type="submit" onClick={() => {
            console.log(selectedUser)
            if (selectedUser) {
              if (!selectedUser.id) {
                exec({ data: { username: selectedUser.username } })
                  .then((r) => {
                    login(r.data);
                    history.push('/')
                  })
              } else {
                login(selectedUser);
                history.push('/');
              }
            }
          }}>
            Ingresar
        </Button>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default UsuarioList;