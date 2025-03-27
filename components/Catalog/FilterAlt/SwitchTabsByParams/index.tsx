import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { Subsection } from '@/models/filter';
import { changeSubsection } from '@/store/slices/filterSlice';

const tabs = [
	{ title: 'by parameters', section: Subsection.ByParams },
	{ title: 'by car', section: Subsection.ByCars }
];

const SwitchTabsByParams = ({ subsection }: { subsection: Subsection }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Catalog');

	const handleClick = (value: Subsection) => {
		dispatch(changeSubsection(value));
	}

	return (
		<div className='flex lg:justify-between gap-x-5 mb-4'>
			{ tabs.map((item, index) => (

				<Button
					key={index}
					variant='light'
					onPress={ () => handleClick(item.section) }
					className={ twMerge(
						'font-bold uppercase lg:normal-case p-0 hover:bg-transparent hover:text-primary',
						subsection === item.section && 'text-primary')
				}>
					{ t(item.title) }
				</Button>
			)) }
		</div>
	)
};

export default SwitchTabsByParams;
