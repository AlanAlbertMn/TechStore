import AddToCartButton from '@/components/AddToCartButton';
import { getProduct } from '@/lib/products';
import { Product } from '@/types/Product';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { prodMock } from '../../../../assets/productDetailsMock';

async function ProductDetails({
	params,
}: {
	params: Promise<{ product: string }>;
}) {
	// const { product } = await params;
	// const prod: Product = await getProduct(product);
	// console.log(prod);
	const prod = prodMock.data;
	// console.log(prod);

	return (
		<section className='bg-slate-950/70 w-full'>
			<div className='mx-auto w-8/12 py-36 flex gap-10'>
				<div className='mx-auto relative w-full h-3/4'>
					<Image
						src={prod.product_photo}
						alt={prod.product_title}
						width={500}
						height={500}
						className='rounded'
					/>
                    <div className='w-full mt-6 grid grid-cols-5 gap-3'>
				{prod.product_photos.map(photo => (
					<Image className='w-full h-2/3 rounded' key={photo} src={photo} alt={photo} width={300} height={300} />
				))}
			</div>
				</div>
				<div>
					<div>
						<p>{prod.product_byline}</p>
						<h2 className='text-2xl font-bold py-5'>{prod.product_title}</h2>
						<p className='py-3'>SKU: {prod.asin}</p>
						<div className='flex items-center mb-5'>
							<p className='pr-2'>{prod.product_star_rating}</p>
							{[...Array(parseInt(prod.product_star_rating))].map((_, i) => (
								<Star color='gold' key={i} size={20} />
							))}
							<p className='ml-2 border-2 border-cyan-700 bg-cyan-900 px-3 rounded-xl'>
								{prod.product_num_ratings} reviews
							</p>
						</div>
					</div>
					<hr className='border-cyan-100' />
					<div className='py-3'>
						<h2 className='text-3xl text-amber-400 py-4'>
							${prod.product_price}
						</h2>
						{prod.product_original_price && (
							<p className='text-xs text-gray-400 pb-4'>
								Previous price:{' '}
								<span className='line-through'>
									{prod.product_original_price}
								</span>
							</p>
						)}
						<p>{prod.sales_volume}</p>
						<p className='mb-7'>{`Delivery on: ${prod.delivery_time} for ${prod.delivery_price}`}</p>
						<AddToCartButton product={prod} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProductDetails;
