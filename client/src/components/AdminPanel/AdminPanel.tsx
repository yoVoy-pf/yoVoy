import { Divider, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styleAdminPanel from './admin-panel.module.css'

const AdminPanel = () => {
  return (
    <div>
      <div className={styleAdminPanel.title_admin}>
        <div className={styleAdminPanel.title_style}>
          <h1>Panel de Administrador</h1>
        </div>
      </div>
      <div className={styleAdminPanel.buttons_admin}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
    
            <button className={styleAdminPanel.buttons_style}>
              <Link className={styleAdminPanel.links_style} to='/userslist'>Ir a la lista de usuarios</Link>
              </button>
            <button className={styleAdminPanel.buttons_style}>
              <Link className={styleAdminPanel.links_style} to='/create-category'>Crear Categoria</Link>
              </button>
            {/* <button className={styleAdminPanel.buttons_style}>button 3</button> */}

      </Stack>
        </div>
    </div>
  )
}

export default AdminPanel