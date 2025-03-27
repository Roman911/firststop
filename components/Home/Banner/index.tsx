import Image from 'next/image';

const Banner = () => {
	return (
		<div className='mt-12 md:mt-20'>
			<Image src='/images/banner.jpg' width={ 1680 } height={ 700 } alt='banner' />
		</div>
	)
};

export default Banner;
