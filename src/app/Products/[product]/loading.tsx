import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
	return (
		<section className='w-full'>
			<div className='mx-auto w-8/12 py-12 flex'>
				<SkeletonTheme baseColor='#202020' highlightColor='#444'>
					<Skeleton width={500} height={500}  />
					<Skeleton className='mx-10 mt-5' count={12} containerClassName='flex-1' />
				</SkeletonTheme>
			</div>
		</section>
	);
};

export default Loading;
