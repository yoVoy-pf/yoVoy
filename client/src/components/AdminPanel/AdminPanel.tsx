import { Divider, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div><h1>Panel de Administrador</h1>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <button><Link to='/userslist'>Go to the Users List</Link></button>
        <button><Link to='/create-category'>Crear Category</Link></button>
        <button>button 3</button>
      </Stack>
    </div>
  )
}

export default AdminPanel