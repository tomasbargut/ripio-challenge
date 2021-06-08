import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { User } from '../../types/User'
import { useHistory } from 'react-router-dom'
const filter = createFilterOptions<User>();
type UsuairoSelectProps = {
  users: Array<User>,
  onChange: (e: React.ChangeEvent<{}>, u: User | null | string) => void
}

export default function UsuarioSelector({ users, onChange }: UsuairoSelectProps) {
  return <Autocomplete
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    freeSolo
    id="user-box"
    options={users}
    getOptionLabel={(option) => option.id ? option.username : `Add: ${option.username}`}
    onChange={onChange}
    renderInput={(params) => <TextField {...params} variant="outlined" />}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);

      if (params.inputValue !== '') {
        filtered.push({
          username: params.inputValue,
          id: 0,
        });
      }
      return filtered;
    }}
  />
}