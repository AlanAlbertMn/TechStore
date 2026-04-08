import { signUpSchema, User } from '@/types/User';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '@/lib/users';
import { generateSalt, hashPassword } from '../core/passwordHasher';

export async function signUp(unsafeData: signUpSchema) {
	// if (!success) return 'Unable to create account'
	const existingUser = await getUser(unsafeData.email);
	if (existingUser) {
		// console.log(existingUser);

		return 'Account already exists for this email';
	}

	try {
		//Hash the password to store it safely in the db
		const userSalt = await generateSalt();
		const hashedPassword = await hashPassword(unsafeData.password, userSalt);

		const user: User = {
			name: unsafeData.name,
			email: unsafeData.email,
			password: hashedPassword,
			salt: userSalt,
		};

		const createdUser = await createUser(user);
		console.log(createdUser);
		return createdUser;
	} catch {
		return 'Unable to create account';
	}
}

export async function logOut() {
	//TODO - Implement
	redirect('/');
}
