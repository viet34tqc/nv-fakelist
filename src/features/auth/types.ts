export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData extends LoginData {
	displayName: string;
	password2: string;
}
