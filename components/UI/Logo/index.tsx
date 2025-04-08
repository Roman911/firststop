'use client'
import { FC } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

const Logo: FC = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') dispatch(setProgress(true));
	}

	return (
		<Link href='/' onClick={ handleClick } className='logo'>
			<Image
				src='/logo_light.svg'
				className='dark:hidden'
				alt="logo"
				width={ 192 }
				height={ 45 }
				priority
			/>
			<Image
				src='/logo_dark.svg'
				className='hidden dark:block'
				alt="logo"
				width={ 192 }
				height={ 45 }
				priority
			/>
		</Link>
	)
};

export default Logo;
