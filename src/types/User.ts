export type signUpSchema = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type signInSchema = {
	email: string;
	password: string;
};

export type User = {
	name: string;
	email: string;
	password: string;
	salt: string;
};
