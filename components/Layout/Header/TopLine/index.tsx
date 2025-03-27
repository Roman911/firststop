import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from '@/components/Layout/Header/TopLine/LanguageChanger';
import ThemeToggle from '@/components/Layout/Header/TopLine/ThemeToggle';

interface Props {
	alias: AliasAll
}

const TopLine: FC<Props> = ({ alias }) => {
	const t = useTranslations('TopLine');

	return (
		<section className='top-line w-full bg-gray-900 dark:bg-gray-900'>
			<div className='container mx-auto py-3 md:px-4'>
				<nav className='gap-2 2xl:gap-6 flex items-center justify-between mx-4'>
					<Menu alias={ alias } />
					<ThemeToggle />
					<LanguageChanger />
					<Button size='lg' color='primary' className='rounded-sm'>
						{ t('sign up for the service') }
					</Button>
				</nav>
			</div>
		</section>
	)
};

export default TopLine;
