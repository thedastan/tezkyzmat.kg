export enum EnumOtpCode {
	REGISTER = 0, //'Регистрация'
	RESET_PASSWORD = 1, //'Восстановить пароль'
	CHANGE_PHONE = 2 //'Изменить номер телефона'
}

export type OtpcodeTypes =
	| typeof EnumOtpCode.REGISTER
	| typeof EnumOtpCode.RESET_PASSWORD
	| typeof EnumOtpCode.CHANGE_PHONE
