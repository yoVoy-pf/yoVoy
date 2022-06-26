import { useSelector } from 'react-redux';
import {
	selectCurrentUser,
	selectCurrentToken,
} from '../../slices/authentication/authSlice';
import { Link } from 'react-router-dom';
import styleWelcome from './welcome.module.css';
import adminImg from "../../img/admin.jpg"
import cambiarPass from "../../img/cambiarpass.jpg"
import detalleCuenta from "../../img/detallecuenta.jpg"
import crearOrg from "../../img/crearorg.jpg"
import eventos from "../../img/eventos.jpg"

export const Welcome = () => {
	const user: any = useSelector(selectCurrentUser);
	const currentRole = user ? user.rolesId.slice(-1) : null;
	console.log(
		'🚀 ~ file: Welcome.tsx ~ line 9 ~ Welcome ~ currentRole',
		currentRole,
	);

	const token = useSelector(selectCurrentToken);
	console.log({ user });

	const welcome = user ? `Bienvenido ${user.name}!` : `Bienvenido!`;

	const content = (
		<section>
			<div className={styleWelcome.welcome_section}>
				<div className={styleWelcome.bienvenida_welcome}>
					<h1>{welcome}</h1>
				</div>
			</div>
			{/* <p>Token: {token}</p> */}
			{currentRole[0] === 3030 && (
				<div className={styleWelcome.links_welcome}>

					{/*Estilo para el Admin */}


					<Link className={styleWelcome.links_style} to="/change-password">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={cambiarPass} alt="cambiarPass" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Cambiar Contraseña</h1>
								</div>
							</div>
						</div>
					</Link>

					<Link className={styleWelcome.links_style} to="/userslist">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={adminImg} alt="adminImg" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Ir al panel de Administrador</h1>
								</div>
							</div>
						</div>
					</Link>

					<Link className={styleWelcome.links_style} to="/user/information">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={detalleCuenta} alt="detalleCuenta" />
							<div className={styleWelcome.containerH1} >
								<div>
									<h1>Detalle de cuenta</h1>
								</div>
							</div>
						</div>
					</Link>


				</div>
			)}
			{currentRole[0] === 1010 && (
				<div className={styleWelcome.links_welcome}>




					<Link className={styleWelcome.links_style} to="/change-password">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={cambiarPass} alt="cambiarPass" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Cambiar Contraseña</h1>
								</div>
							</div>
						</div>
					</Link>

					<Link className={styleWelcome.links_style} to="/create-organization">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={crearOrg} alt="cambiarPass" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Crear Organización</h1>
								</div>
							</div>
						</div>
					</Link>

					<Link className={styleWelcome.links_style} to="/user/information">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={detalleCuenta} alt="detalleCuenta" />
							<div className={styleWelcome.containerH1} >
								<div>
									<h1>Detalle de cuenta</h1>
								</div>
							</div>
						</div>
					</Link>


				</div>
			)}
			{currentRole[0] === 2020 && (
				<div className={styleWelcome.links_welcome}>




					<Link className={styleWelcome.links_style} to="/change-password">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={cambiarPass} alt="cambiarPass" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Cambiar Contraseña</h1>
								</div>
							</div>
						</div>
					</Link>

					<Link className={styleWelcome.links_style} to="/organization-events">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={eventos} alt="eventos" />
							<div className={styleWelcome.containerH1}>
								<div>
									<h1>Eventos de la organización</h1>
								</div>
							</div>
						</div>

					</Link>

					<Link className={styleWelcome.links_style} to="/user/information">
						<div className={styleWelcome.containerImgAndH1}>
							<img src={detalleCuenta} alt="detalleCuenta" />
							<div className={styleWelcome.containerH1} >
								<div>
									<h1>Detalle de cuenta</h1>
								</div>
							</div>
						</div>
					</Link>


				</div>
			)}
		</section>
	);
	return content;
};
