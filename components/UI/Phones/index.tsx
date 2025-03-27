import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { SettingsProps } from '@/models/settings';
import type { PhoneLogo } from '@/models/config';

interface Props {
	isInfo: boolean
	settings: SettingsProps
	className?: string
}

const Phones: FC<Props> = ({ isInfo, settings, className = '' }) => {
	const telephones: {
		phone: string
		url: string
		logo: PhoneLogo
	}[] = [
		{ phone: settings.ua.config_telephone_vodafone, url: settings.ua.config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings.ua.config_telephone_kievstar, url: settings.ua.config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings.ua.config_telephone_life, url: settings.ua.config_telephone_life_url, logo: 'life' },
	];

	const filterTelephones = telephones.filter(i => i.phone);

	return (
		<div className={
			twMerge('py-1 flex items-center', isInfo && 'flex-col items-start gap-2', className)
		}>
			{ filterTelephones.map((item, index) => {
				return <div
					key={ index }
					className={ twMerge('flex items-center my-0.5', !isInfo && 'mr-1.5 md:mr-5') }
				>
					<a href={ `tel:${ item.url }` } className=''>
						{ item.phone }
					</a>
				</div>
			}) }
		</div>
	)
};

export default Phones;
