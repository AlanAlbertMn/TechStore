'use client';
import Image from 'next/image';
import { useState } from 'react';

const ProductImageCarrousel = ({
	photo,
	title,
	photoArr,
}: {
	photo: string;
	title: string;
	photoArr: string[];
}) => {
	const [mainPhoto, setMainPhoto] = useState<string>(photo);

	const handleClick = (photo: string) => {
		setMainPhoto(photo);
	};

	return (
		<div className='mx-auto w-full md:w-1/2'>
			<div className='relative my-4 md:mb-20 max-h-2/3'>
				<Image
					alt={title}
					className='rounded h-96'
					height={350}
					width={900}
					style={{ objectFit: 'contain' }}
					src={mainPhoto}
				/>
			</div>
			{photoArr && (
				<div className='w-full grid grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3'>
					{photoArr.map((photo) => (
						<Image
							className='w-full h-full max-h-52 rounded overflow-hidden cursor-pointer'
							key={photo}
							src={photo}
							alt={photo}
							width={200}
							style={{ objectFit: 'cover' }}
							height={200}
							onClick={() => handleClick(photo)}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductImageCarrousel;
