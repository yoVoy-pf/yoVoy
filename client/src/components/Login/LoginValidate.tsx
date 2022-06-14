const validateEmail = (input: any) => {
	let errorsEmail: any = {};
	if (input.email.includes(' ')) {
		errorsEmail.email = 'Introduzca un Email valido';
	}
	if (
		!input.email.match(
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
		)
	) {
		errorsEmail.email = 'Introduzca un Email valido';
	}
	return errorsEmail;
};

const validatePassword = (input: any) => {
	let errorsPassword: any = {};

	if (input.password.includes(' ')) {
		errorsPassword.password =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
	}
	if (!input.password.match(/^([a-zA-Z0-9]){6,15}$/)) {
		errorsPassword.password =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
	}
	if (input.password.length < 6) {
		errorsPassword.password =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
	}
	if (input.password.length > 15) {
		errorsPassword.password =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
	}
	return errorsPassword;
};

export { validateEmail, validatePassword };
