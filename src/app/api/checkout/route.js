import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
	console.log(request);

	const body = await request.json();

	console.log(body);

	const convertedPrice =
		Number(body.product.product_price.replaceAll('$', '')) * 100;

	const session = await stripeClient.checkout.sessions.create({
		success_url: process.env.NEXT_PUBLIC_URL + '/success',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: body.product.product_title,
						images: [body.product.product_photo],
					},
					unit_amount: convertedPrice,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		metadata: {
			productId: body.product.asin,
			userId: body.userId,
		},
	});

	return NextResponse.json(session);
}
