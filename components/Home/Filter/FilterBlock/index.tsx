'use client'
import { FC, JSX, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { Section } from '@/models/section';

interface Props {
	children: JSX.Element
	section: Section
	onSubmit: (section: Section) => void
	className?: string
}

const FilterBlock: FC<Props> = ({ children, section, onSubmit, className }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(value));
	};

	const onClick = () => {
		setIsLoading(true);
		onSubmit(section);
	}

	return (
		<div
			className={ twMerge('flex-1 flex flex-col justify-between p-10 bg-white/75 dark:bg-neutral-900/75 rounded-lg max-w-7xl w-full mx-auto mb-24 mt-auto', className, section === Section.Battery && 'md:bg-primary') }>
			<div className='flex items-center justify-center gap-8 md:gap-20 mb-6 md:mb-0'>
				<Button
					size='lg'
					onPress={ () => handleClick(Section.Tires) }
					variant='light'
					radius='none'
					className={ twMerge('px-0 min-w-max text-lg uppercase font-bold text-black dark:text-white border-b-4 border-transparent hover:text-primary dark:hover:text-primary', section === Section.Tires && 'text-primary dark:text-primary border-primary') }
				>
					{ t('tires') }
				</Button>
				<Button
					size='lg'
					onPress={ () => handleClick(Section.Disks) }
					variant='light'
					radius='none'
					className={ twMerge('px-0 min-w-max text-lg uppercase font-bold text-black dark:text-white border-b-4 border-transparent hover:text-primary dark:hover:text-primary', section === Section.Disks && 'text-primary dark:text-primary border-primary') }
				>
					{ t('disks') }
				</Button>
				<Button
					size='lg'
					onPress={ () => handleClick(Section.Car) }
					variant='light'
					radius='none'
					className={ twMerge('px-0 min-w-max text-lg uppercase font-bold text-black dark:text-white border-b-4 border-transparent hover:text-primary dark:hover:text-primary', section === Section.Car && 'text-primary dark:text-primary border-primary') }
				>
					{ t('by car') }
				</Button>
			</div>
			<div className={ twMerge('grid grid-cols-1 md:grid-cols-7 gap-2.5 md:mt-7', section === Section.Car && 'md:grid-cols-6') }>
				{ children }
				{ section !== Section.Car && <Button
					color='primary'
					isLoading={ isLoading }
					size='lg'
					radius='none'
					onPress={ onClick }
					className='w-full font-semibold'
				>
					{ t('choose') }
				</Button> }
			</div>
		</div>
	)
};

export default FilterBlock;
