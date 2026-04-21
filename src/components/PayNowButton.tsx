'use client';

import { Product } from '@/types/Product';
import { redirect } from 'next/navigation';

const PayNowButton = ({
	product,
	userId,
}: {
	product: Product;
	userId: number;
}) => {
	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({ product, userId }),
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
			className='w-full text-white bg-[#2563EB] hover:bg-[#1a4196] rounded-xl h-10 mt-1'
		>
			Pay now
		</button>
	);
};

export default PayNowButton;
