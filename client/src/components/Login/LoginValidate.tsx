const validateUser = (input: any) => {
	let errorsUser: any = {};
	if (input.user.includes(' ')) {
		errorsUser.user =
			'El Usuario debe contener al menos 6 a 16 caracteres y solo admite letras o numeros';
	}
	if (!input.user.match(/^([a-zA-Z0-9]){6,16}$/)) {
		errorsUser.user =
			'El Usuario debe contener al menos 6 a 16 caracteres y solo admite letras o numeros';
	}
	console.log(input.user);
	return errorsUser;
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
	console.log(input.password);
	return errorsPassword;
};

export { validateUser, validatePassword };
