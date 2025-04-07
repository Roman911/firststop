import Image from 'next/image';

const Banners = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			<Image src='/images/home-banners/banner-1.jpg' className='rounded-lg shadow-lg' alt='' width={ 828 } height={ 350 }/>
			<Image src='/images/home-banners/banner-2.jpg' className='rounded-lg shadow-lg' alt='' width={ 828 } height={ 350 }/>
		</div>
	)
};

export default Banners;
