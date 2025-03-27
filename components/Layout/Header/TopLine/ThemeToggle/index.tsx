'use client'
import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@heroui/button';
import * as Icons from '@/components/UI/Icons';

const MyButton = (
	{ children, value, onClick, className, ariaLabel }:
	{ children: ReactNode, value: 'dark' | 'light', onClick: (theme: 'dark' | 'light') => void, className: string, ariaLabel: string }
) => {
	return (
		<Button
			isIconOnly
			size='sm'
			aria-label={ ariaLabel }
			variant='bordered'
			color='primary'
			className={ className }
			onPress={() => onClick(value)}
		>
			{ children }
		</Button>
	)
}

const ThemeToggle = () => {
	const { setTheme } = useTheme();

	const handleToggle = (theme: 'dark' | 'light') => {
		setTheme(theme);
	}

	return (
		<div>
			<MyButton value='dark' ariaLabel='Switch to dark mode' className='bg-transparent dark:bg-primary border-white dark:border-primary' onClick={ handleToggle }>
				<Icons.MoonIco fill='white' className='h-5 w-5' />
			</MyButton>
			<MyButton value='light' ariaLabel='Switch to light mode' className='bg-primary dark:bg-transparent ml-2 border-primary dark:border-white' onClick={ handleToggle }>
				<Icons.SunIcon stroke='white' className='h-5 w-5' />
			</MyButton>
		</div>
	)
};

export default ThemeToggle;
