import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSigningSecret = process.env.ENDPOINT_SIGNING_SECRET;

export async function POST(request) {
	const body = await request.text();
	const headersList = await headers();
	const sig = headersList.get('stripe-signature');

	let event;
	try {
		event = stripeClient.webhooks.constructEvent(
			body,
			sig,
			endpointSigningSecret,
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const checkoutSessionCompleted = event.data.object;
			//TODO: save in DB from body info
			console.log({ checkoutSessionCompleted });
			break;

		default:
			console.log('Event does not match any registered types: ' + error.type);
	}

	return new Response(null, { status: 200 });
}
