'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageCarrousel = ({photo, title, photoArr}) => {
    const [mainPhoto, setMainPhoto] = useState(photo)
	return (
		<div className='mx-auto relative w-full h-3/4'>
			<Image
				src={mainPhoto}
				alt={title}
				width={500}
				height={500}
				className='rounded'
			/>
			<div className='w-full mt-6 grid grid-cols-5 gap-3'>
				{photoArr.map(photo => (
					<Image
						className='w-full h-2/3 rounded'
						key={photo}
						src={photo}
						alt={photo}
						width={300}
						height={300}
                        onClick={() => setMainPhoto(photo)}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarrousel;
