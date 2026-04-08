'use server';

import sql from 'better-sqlite3';

const db = sql('techpulse.db');

export async function getUser(email) {
	return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export async function createUser(user) {
	db.prepare(
		'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)',
	).run(user.name, user.email, user.password, user.salt);
	return getUser(user.email);
}
