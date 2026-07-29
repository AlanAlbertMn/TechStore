'use server';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';
import { getUserById } from '@/lib/users';
import { redisClient } from '@/redis/redis';
import { RedisUser } from '@/types/User';

const SESSION_EXPIRATION_DAYS = 60 * 60 * 24 * 7;

export async function getUserFromSession(withFullUser: boolean = false) {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get('sessionId')?.value;

	if (sessionId == null) return null;

	const userInfo = await getUserSessionById(sessionId);
	if (userInfo == null) return null;

	if (withFullUser) {
		const userFound = await getUserById(userInfo.userId);
		return userFound;
	} else {
		return userInfo;
	}
}

async function getUserSessionById(sessionId: string) {
	const user = (await redisClient.get(`session:${sessionId}`)) as RedisUser;
	return user ? user : null;
}

export async function createUserSession(user: User) {
	const sessionId = crypto.randomBytes(512).toString('hex').normalize();
	//Save in redis
	await redisClient.set(
		`session:${sessionId}`,
		{ userId: user.id, userRole: user.role },
		{ ex: SESSION_EXPIRATION_DAYS },
	);
	const cookieStore = await cookies();
	cookieStore.set('sessionId', sessionId, {
		httpOnly: true,
		secure: true,
		expires: Date.now() + SESSION_EXPIRATION_DAYS * 1000,
		sameSite: 'lax',
	});
}

export async function deleteUserSession() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get('sessionId')?.value;
	if (sessionId == null) return null;
	await redisClient.del(`session:${sessionId}`);
	cookieStore.delete('sessionId');
}
