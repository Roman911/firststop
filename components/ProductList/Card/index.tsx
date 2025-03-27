'use client';
import { FC, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link, useRouter } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import { setProgress } from '@/store/slices/progressSlice';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import IconsBlock from '@/components/ProductList/Card/IconsBlock';
import ActionsBlock from '@/components/ProductList/Card/ActionsBlock';
import * as Icons from '@/components/UI/Icons';

const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface Props {
	item: Product
}

const ProductCard: FC<Props> = ({ item }) => {
	const [ isLoading, setLoading ] = useState(false);
	const locale = useLocale();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url, best_offer, group } = item;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : Section.Disks;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const handleClick = () => {
		setLoading(true);
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/cart`)
	};

	const onClick = () => {
		dispatch(setProgress(true));
	}

	return (
		<Card radius='none' className='relative'>
			<CardBody>
				<div className='relative min-h-72 sm:min-h-52 text-center'>
					<ActionsBlock sectionNew={ sectionNew } group={ group }/>
					<IconsBlock season={ season } vehicle_type={ vehicle_type }/>
					<Image
						className='mx-auto'
						src={ default_photo || `/images/no-photo${ locale === Language.UK ? '' : '-ru' }.jpg` }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</div>
				<Link
					href={ `/${ page_url }` }
					onClick={ onClick }
					className='font-semibold mt-2.5 mb-1 min-h-12 after:absolute after:inset-0'
				>
					{ full_name }
				</Link>
				<div className='text-sm text-gray-600 py-1 px-2 max-w-max rounded-md bg-gray-100'>
					<span>Артикул: </span><span>{ sku }</span>
				</div>
				<div className='flex items-end mt-4'>
					<div className='text-xl font-bold'>{ min_price } грн</div>
				</div>
			</CardBody>
			<CardFooter>
				<Button isLoading={ isLoading } className='uppercase font-bold w-full' onPress={ handleClick } color='primary' variant='bordered' radius='sm'>
					<Icons.CartIcon />
					{ t('buy') }
				</Button>
			</CardFooter>
		</Card>
	)
};

export default ProductCard;
