'use client'
import { FC, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useLocale, useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { removeParam, resetFilter } from '@/store/slices/filterSlice';
import { generateUrl, parseUrl } from '@/lib/seo';
import { IFilter } from '@/models/seo';
import * as Icons from '../../UI/Icons';
import { Section } from '@/models/filter';
import { SeasonTransform, VehicleTypeTransform } from '@/lib/characteristicsTransform';

interface FilterActiveProps {
	className?: string
}

const FilterActive: FC<FilterActiveProps> = ({ className }) => {
	const router = useRouter();
	const { section, slug } = useParams();
	const locale = useLocale();
	const t = useTranslations('Filters');
	const [ searchParams, setSearchParams ] = useState<IFilter | undefined>(undefined);
	const { filter } = useAppSelector(state => state.filterReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ filter.brand }`);

	useEffect(() => {
		if(slug) {
			const url = parseUrl(Array.isArray(slug) ? slug.join('/') : '');
			setSearchParams(url);
		} else {
			setSearchParams(undefined);
		}
	}, [ slug ]);

	const clearParam = (name: keyof IFilter) => {  // Use keyof IFilter to restrict name to valid keys
		if(searchParams) {  // Check if searchParams is defined
			const updatedSearchParams = { ...searchParams };
			delete updatedSearchParams[name];
			const searchUrl = generateUrl(updatedSearchParams);
			setSearchParams(updatedSearchParams);
			dispatch(removeParam({ [name]: null }));
			router.push(`/${ locale }/catalog/${ section }/${ searchUrl }`)
		}
	};

	const clearAllParams = () => {
		dispatch(resetFilter());
		router.push(`/${ locale }/catalog/${ section }`)
	}

	const renderItem = (name: keyof IFilter, label: string | number | null) => {
		return (
			<div key={ name }
					 className="p-1 bg-gray-100 text-black text-sm font-medium rounded-full flex items-center gap-1">
				<span className="ml-1.5">{ label }</span>
				<button onClick={ () => clearParam(name) } className='rounded-full p-1'>
					<Icons.CloseIcon className="stroke-black h-3 w-3"/>
				</button>
			</div>
		);
	};

	return (
		<div
			className={
				twMerge('mb-3 flex flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-4 text-end p-4 lg:p-0', className)
			}>
			{ searchParams && Object.keys(searchParams || {}).filter(item => searchParams && searchParams[item as keyof IFilter]).map(item => {
				const label = searchParams[item as keyof IFilter];

				// Example: Additional check if label is null or undefined
				if(label == null) return null; // Skip rendering if label is null

				if(item === 'brand') {
					if(section === Section.Disks && data?.brand_disc) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						const brand = data.brand_disc.find(i => i.value === +searchParams[item as keyof IFilter]);
						return renderItem(item as keyof IFilter, t(brand ? brand.label : '') || null);
					} else if(data?.brand) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						const brand = data.brand.find(i => i.value === +searchParams[item as keyof IFilter]);
						return renderItem(item as keyof IFilter, brand?.label || null);
					}
				}

				if(item === 'model_id') {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const modelId = manufModels?.find(i => i.value === +searchParams[item as keyof IFilter]);
					return renderItem(item as keyof IFilter, t(modelId ? modelId.label : '') || null);
				}

				if(item === 'sezon') {
					if(searchParams[item]) {
						return renderItem(
							item as keyof IFilter,
							t(SeasonTransform(searchParams[item])?.name || '') ?? ''
						);
					}
				}

				if(item === 'vehicle_type') {
					if(searchParams[item]) {
						return renderItem(
							item as keyof IFilter,
							t(VehicleTypeTransform(searchParams[item])?.name || '') ?? ''
						);
					}
				}

				if(item === 'only_studded') {
					return renderItem(item as keyof IFilter, 'Шип');
				}

				if(item === 'typedisk') {
					if(searchParams[item] === '1') {
						return renderItem(item as keyof IFilter, t('steel') || null);
					} else if(searchParams[item] === '2') {
						return renderItem(item as keyof IFilter, t('forged') || null);
					} else if(searchParams[item] === '3') {
						return renderItem(item as keyof IFilter, t('cast') || null);
					} else {
						return null; // Return null if the type value is not valid
					}
				}

				// Double-check that label is not null or undefined before rendering
				if(label == null) return null;

				return renderItem(item as keyof IFilter, searchParams[item as keyof IFilter] || null);
			}) }
			{ searchParams && Object.keys(searchParams).length !== 0 && <button onClick={ () => clearAllParams() }
																																					className='text-sm font-medium text-primary group'>
				{ t('reset everything') }
			</button> }
		</div>
	)
};

export default FilterActive;
