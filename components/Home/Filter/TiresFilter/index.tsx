'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '../Select';
import type { FilterProps } from '../filterHomePage';

const TiresFilter: FC<FilterProps> = ({ filters, onChange, section }) => {
	const t = useTranslations('Filters');

	return <>
		{ filters.map(item => {
			return <MySelect
				key={ item.name }
				name={ item.name }
				label={ t(item.label) }
				options={ item.options }
				onChange={ onChange }
				focusValue={ item.focusValue }
				section={ section }
				hidden={ item.hidden }
			/>
		}) }
	</>
};

export default TiresFilter;
