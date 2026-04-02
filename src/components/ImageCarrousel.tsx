'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageCarrousel = ({photo, title, photoArr}: {photo: string, title: string, photoArr: string[]}) => {
    const [mainPhoto, setMainPhoto] = useState<string>(photo)
    const [tmpPhoto, setTmpPhoto] = useState<string>('')

	const handleHoverIn = (photo: string) => {
		setTmpPhoto(mainPhoto);
		setMainPhoto(photo);
	}

	const handleHoverOut = () => {
		setMainPhoto(tmpPhoto);
		setTmpPhoto('');
	}

	return (
		<div className='mx-auto relative w-full h-3/4'>
			<Image
				src={mainPhoto}
				alt={title}
				width={500}
				height={500}
				className='rounded w-4xl h-96'
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
                        onClick={() => handleHoverIn(photo)}
                        onMouseEnter={() => handleHoverIn(photo)}
                        onMouseLeave={handleHoverOut}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarrousel;
