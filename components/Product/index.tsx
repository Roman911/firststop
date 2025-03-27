'use client'
import { FC, useEffect, useState } from 'react';
import ImagesBlock from './ImagesBlock';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection } from '@/store/slices/filterSlice';
import { Language } from '@/models/language';
import { ProductProps } from '@/models/product';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import ActionsBlock from '@/components/Product/ActionsBlock';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import Quantity from '@/components/UI/Quantity';
import { addCart } from '@/store/slices/cartSlice';
import CharacteristicsBlock from '@/components/Product/CharacteristicsBlock';
import Offers from '@/components/Product/Offers';
import BuyActions from '@/components/Product/BuyActions';

interface Props {
	idProduct: string
	locale: Language
	data: ProductProps
	section: Section
}

const ProductComponent: FC<Props> = ({ idProduct, locale, data, section }) => {
	const dispatch = useAppDispatch();
	const [ offerId, setOfferId ] = useState('0');
	const [ quantity, setQuantity ] = useState(1);
	const { id = 0, full_name = '', offers = [], photo, offer_group } = data?.data || {};
	const offer = offers.find(item => item.offer_id === +offerId);
	const review = data?.data.review;
	const commentsAvgRateSum = review && review.length > 0
		? review.reduce((sum, current) => sum + (current.score || 0), 0) : 0;
	const averageScore = review && review.length > 0 ? commentsAvgRateSum / review.length : undefined;

	useEffect(() => {
		const storage = getFromStorage('reducerRecentlyViewed');
		const updatedStorage = storage.filter((item: { id: number, section: Section }) => item.id !== Number(idProduct));
		const deleteElement = updatedStorage.length === 4 ? updatedStorage.slice(1, 3) : updatedStorage;
		addToStorage('reducerRecentlyViewed', [ ...deleteElement, { id: idProduct, section: section } ]);
	}, [id, idProduct, section]);

	useEffect(() => {
		if(data) setOfferId(`${data.data.offers[0].offer_id}`);
	}, [ data ]);

	useEffect(() => {
		if(section !== Section.Battery && data && offer && offer.quantity >= 4) setQuantity(4);
	}, [data, offer, section]);

	useEffect(() => {
		if(data) {
			if(section === 'disks') {
				dispatch(changeSection(Section.Disks));
			}
		}
	}, [ data, dispatch, section ]);

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < Number(offer?.quantity) ? numericValue : Number(offer?.quantity));
	}

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const onSubmit = () => {
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: +offerId, section, quantity } ];
		dispatch(addCart({ id: +offerId, section, quantity }));
		addToStorage('reducerCart', cart);
	}

	return (
		<section className='product-page xl:gap-x-6 mt-4 md:mt-6 bg-white dark:bg-black py-6 md:py-14 px-4 md:px-10 rounded-xl'>
			{ data.result &&
				<div className='relative flex flex-col md:flex-row items-center md:items-start md:border-b border-gray-200'>
					<ImagesBlock
						locale={ locale }
						images={ data.data.photos.urls || [] }
						photo={ photo }
						full_name={ full_name }
					/>
					<ActionsBlock className='absolute right-0 top-0 z-10 flex' id={ id } section={ section } />
					<div className='relative flex-1 md:ml-6 xl:ml-10'>
						<h1 className='text-2xl font-bold mt-8 md:mt-0 mr-10'>{ full_name }</h1>
						<div className='flex mt-4 items-center'>
							<div className='text-gray-600 bg-gray-100 rounded-md py-2 md:py-2 px-3 mr-5'>
								Артикул: { offer_group.sku }
							</div>
							<Rating
								commentsCount={ review ? (review.length > 0 ? review.length : undefined) : undefined }
								commentsAvgRate={ averageScore || 0 }
							/>
						</div>
						<div className='flex justify-between mt-4 md:mt-8'>
							<div>
								<div className='flex items-end'>
									<div className='text-2xl font-bold mr-2.5'>{ offer && +offer?.price } грн</div>
								</div>
							</div>
						</div>
						<Offers locale={ locale } offerId={ offerId } offers={ offers } setOfferId={ setOfferId } setQuantity={ setQuantity } />
						<div className='mt-12'>
							<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) }
												price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity }/>
						</div>
						<BuyActions locale={ locale } offerId={ +offerId } quantity={ quantity } section={ section } onSubmit={ onSubmit } data={ data } />
					</div>
				</div> }
			<CharacteristicsBlock locale={ locale } data={ data } />
		</section>
	)
};

export default ProductComponent;
