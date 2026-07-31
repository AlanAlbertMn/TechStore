'use client';

import { Product } from '@prisma/client';
import { redirect } from 'next/navigation';

const BuyNowButton = ({
	product,
	userId,
}: {
	product: Product;
	userId: number;
}) => {
	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({ userId, cart: [{ product, quantity: 1 }] }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const session = await res.json();

		redirect(session.url);
	};

	return (
		<button
			onClick={() => handlePay()}
			className='w-full text-white transition-all font-medium bg-sky-700 hover:bg-sky-800 hover:scale-[1.02] rounded-xl h-10 mt-1'
		>
			Buy now
		</button>
	);
};

export default BuyNowButton;
