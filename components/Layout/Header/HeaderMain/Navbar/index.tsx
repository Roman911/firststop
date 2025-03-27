'use client'
import { useRef, useState, MouseEvent, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { useClickOutside } from '@/hooks/clickOutside';
import CarTireFilter from '../CarTireFilter';
import CarDiskFilter from '../CarDiskFilter';
import { links } from '../../links';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const t = useTranslations('Main');
	const [ open, setOpen ] = useState(false);
	const [ section, setSection ] = useState('tires');
	const filterRef = useRef<HTMLDivElement>(null);

	const closeFilter = () => {
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if(section !== value) {
			setSection(value);
		}
	};

	const onclick = (href: string) => {
		if(pathname !== href) {
			dispatch(setProgress(true));
		}
	}

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<button
			type='button'
			onClick={ event => handleClick(event, sectionItem) }
			className='group transition outline-none uppercase bg-gray-900 w-48 rounded-md h-12 hover:bg-gray-700'
		>
			<span className='text-white font-semibold text-lg'>{ label }</span>
		</button>
	)

	return (
		<>
			<nav className='container text-lg flex justify-between items-center gap-2'>
				{[{ section: 'tires', label: t('tires') }, { section: 'disks', label: t('disks') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return (
						<Link
							key={ index }
							href={ item.url }
							onClick={ () => onclick(item.url) }
							className='group transition outline-none uppercase bg-gray-900 w-48 rounded-md h-12 hover:bg-gray-700 flex items-center justify-center'
						>
							<span className='text-white font-semibold text-lg'>{ t(item.title) }</span>
						</Link>
					)
				}) }
			</nav>
			<div
				ref={ filterRef }
				className={ twMerge('absolute left-0 right-0 top-20 z-30 flex w-full -mt-0.5', !open && 'hidden') }>
				<div
					className='w-full overflow-hidden bg-white shadow-lg pt-8 pb-6 font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{ section === 'tires' ? <CarTireFilter closeFilter={ closeFilter } /> :
							<CarDiskFilter closeFilter={ closeFilter } /> }
					</div>
				</div>
			</div>
		</>
	)
};

export default Navbar;
