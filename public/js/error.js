class ErrorCode {

	constructor(){
		window.addEventListener('click', function(){
			let errorPlaceholders = document.querySelectorAll('.a-notify');

			for (var i = 0; i < errorPlaceholders.length; i++) {
				errorPlaceholders[i].parentNode.removeChild(errorPlaceholders[i]);
			}
		})
	}

	errorCodes(code){
		let codesState = {
			11000: 'Такой пользователь уже есть в системе',
			401: 'Не правильно введен логин или пароль'
		}

		return codesState[code];
	}	

}

export default new ErrorCode