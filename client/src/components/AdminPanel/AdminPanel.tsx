import React from 'react';
import { Link } from 'react-router-dom';
import styleAdminPanel from './admin-panel.module.css';

const AdminPanel = () => {

	return (
		<div>
			<div className={styleAdminPanel.panel_admin}>
					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Panel Admin:</legend>
					<h3 className={styleAdminPanel.text}>¡Bienvenido!</h3>
					</fieldset>

					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Ir a:</legend>
					<button className={styleAdminPanel.buttons_style}>
						<Link className={styleAdminPanel.links_style} to="/userslist">
							Lista de usuarios
						</Link>
					</button>
					</fieldset><br />
					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Ir a:</legend>
						<Link className={styleAdminPanel.links_style} to='/organization-list'>
					<button className={styleAdminPanel.buttons_style}>
							Lista de Organizaciones
					</button>
							</Link>
					</fieldset> <br />
					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Ir a:</legend>
						<Link className={styleAdminPanel.links_style} to="/events-config">
					<button className={styleAdminPanel.buttons_style}>
							Configurar Eventos
					</button>
						</Link>
					</fieldset> <br />
					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Ir a:</legend>
						<Link className={styleAdminPanel.links_style} to="/create-category">
					<button className={styleAdminPanel.buttons_style}>
							Crear Categoria
					</button>
						</Link>
					</fieldset> <br />
					<fieldset className={styleAdminPanel.fieldset_panel_admin}>
					<legend  className={styleAdminPanel.legend}>Ir a:</legend>
						<Link className={styleAdminPanel.links_style} to="/create-event">
					<button className={styleAdminPanel.buttons_style}>
							Crear Evento
					</button>
						</Link>
					</fieldset>
					{/* <button className={styleAdminPanel.buttons_style}>button 3</button> */}
			
				
			</div>

		</div>
	);
};


export default AdminPanel;
