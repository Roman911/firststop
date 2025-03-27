import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CountryInfoProps {
	country: string
	year: number
	mobileHidden?: boolean
}

const CountryInfo: FC<CountryInfoProps> = ({ country, year, mobileHidden }) => {
	return <div className='flex items-center bg-gray-100 max-w-max py-1 px-2 rounded-md'>
		<p className='font-medium text-black'>
			<span className={ twMerge(mobileHidden && 'hidden sm:inline') }>
				{ country }
				{ country && year && ', ' }
			</span>{ year > 0 && year }
		</p>
	</div>
};

export default CountryInfo;
