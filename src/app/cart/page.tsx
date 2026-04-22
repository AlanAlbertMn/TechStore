'use client';
import { MinusCircleIcon, PlusCircleIcon, Trash } from 'lucide-react';
import { useCart } from '@/lib/CartProvider';
import Image from 'next/image';
import { CartProps } from '@/types/Product';
import { redirect } from 'next/navigation';
import { getUserFromSession } from '../api/auth/core/session';
import { sessionSchema } from '@/types/User';
import { useEffect, useState } from 'react';

const CartDrawer = () => {
	const [userId, setUserId] = useState<number>();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = (await getUserFromSession()) as sessionSchema;
				if (response) {
					setUserId(response.userId);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const { cart, setCart } = useCart();

	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({ cart, userId }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(res);

		const session = await res.json();

		redirect(session.url);
	};

	const handleProductAdd = (item: CartProps) => {
		setCart(
			cart.map((ci) =>
				ci.product.asin == item.product.asin
					? { ...item, quantity: item.quantity + 1 }
					: ci,
			),
		);
	};

	const handleProductDelete = (item: CartProps) => {
		setCart((prevCart) => {
			if (item.quantity == 1) {
				return prevCart.filter((ci) => ci.product.asin != item.product.asin);
			} else {
				return prevCart.map((ci) => {
					if (ci.product.asin == item.product.asin) {
						return { ...ci, quantity: ci.quantity - 1 };
					} else return ci;
				});
			}
		});
	};

	return (
		<div className='right-0 top-0 h-full w-xl mx-auto dark:bg-slate-900 py-6 flex flex-col items-center'>
			{cart.length === 0 && <h3 className='text-center text-4xl'>No items</h3>}

			{cart.map((item, i) => (
				<div key={i} className='my-4 flex flex-col items-center'>
					<Image
						className='rounded-xl'
						src={item.product.product_photo}
						alt={item.product.product_title}
						width={300}
						height={300}
					/>
					<p className='text-center'>{`${item.product.product_title.split(' ').slice(0, 6).join(' ')}...`}</p>
					<p className='text-sm text-slate-400'>{item.product.product_price}</p>
					<div className='flex gap-4 border-amber-300 border-2 rounded-2xl px-5 py-2'>
						{item.quantity == 1 ? (
							<button>
								<Trash
									className='cursor-pointer'
									onClick={() => handleProductDelete(item)}
								/>
							</button>
						) : (
							<button>
								<MinusCircleIcon
									className='cursor-pointer'
									onClick={() => handleProductDelete(item)}
								/>
							</button>
						)}
						<p className=''>{item.quantity}</p>

						<button>
							<PlusCircleIcon
								className='cursor-pointer'
								onClick={() => handleProductAdd(item)}
							/>
						</button>
					</div>
				</div>
			))}
			{cart.length !== 0 && (
				<>
					<p className='pt-6 text-center text-3xl'>
						Total: $
						{cart
							.reduce(
								(cartTotal, currProd) =>
									cartTotal +
									Number(currProd.product.product_price!.replaceAll('$', '')) *
										currProd.quantity,
								0,
							)
							.toFixed(2)}
					</p>
					<button
						className='mt-6 w-2/3 bg-blue-500 text-white py-3 rounded-xl cursor-pointer'
						onClick={() => handlePay()}
					>
						Checkout
					</button>
				</>
			)}
		</div>
	);
};

export default CartDrawer;
