import { FC } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { Link } from '@/i18n/routing';
import Quantity from '@/components/UI/Quantity';

interface CartItemProps {
	id: number
	pageUrl: string
	quantity: number
	default_photo: string
	full_name: string
	price: string
	sku: number
	country: string
	year: number
	offerQuantity: number,
	removeProduct: (id: number) => void
	setQuantity: (id: number, quantity: number) => void
}

const CartItem: FC<CartItemProps> = (
	{
		id,
		pageUrl,
		quantity,
		default_photo,
		full_name,
		price,
		sku,
		offerQuantity,
		setQuantity,
		removeProduct,
	}) => {

	const onChange = (e: { target: HTMLInputElement }) => {
		console.log(e)
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(id,numericValue < offerQuantity ? numericValue : offerQuantity);
	}

	return <div className='flex flex-col md:flex-row py-4 items-center relative border-b border-gray-200'>
		<Link href={`/${pageUrl}`}>
			<Image src={ default_photo } height={ 160 } width={ 160 } alt={ full_name } />
		</Link>
		<div className='ml-4 pr-4 mt-4 md:my-2 md:pr-0 w-full'>
			<Link href={ `/${pageUrl}` } className='font-bold md:text-xl flex md:pr-14 underline hover:text-primary transition'>
				{ full_name }
			</Link>
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<div className='flex-1'>
					<div className='py-2 px-4 text-sm bg-gray-100 text-gray-600 mt-1 max-w-max rounded-sm'>Арт: { sku }</div>
					<div className='font-bold text-xl mt-4 md:mt-12'>{ price } грн</div>
				</div>
				<div className='flex flex-col items-end mt-6 md:mt-4 mr-4 gap-4'>
					<Quantity
						id={ id }
						price={ price }
						quantity={ quantity }
						offerQuantity={ offerQuantity }
						onChange={ onChange }
						setQuantity={ setQuantity }
						isCart={ true }
					/>
				</div>
			</div>
		</div>
		<Button
			isIconOnly
			variant='light'
			onPress={() => removeProduct(id)}
			className='absolute top-4 right-0 md:right-3 p-2'
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M19 7C18.7348 7 18.4804 7.10536 18.2929 7.29289C18.1054 7.48043 18 7.73478 18 8V19.191C17.9713 19.6967 17.744 20.1706 17.3675 20.5094C16.991 20.8482 16.4959 21.0246 15.99 21H8.01C7.5041 21.0246 7.00898 20.8482 6.63251 20.5094C6.25603 20.1706 6.02869 19.6967 6 19.191V8C6 7.73478 5.89464 7.48043 5.70711 7.29289C5.51957 7.10536 5.26522 7 5 7C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8V19.191C4.02854 20.2272 4.46658 21.2099 5.21818 21.9238C5.96978 22.6378 6.97367 23.0247 8.01 23H15.99C17.0263 23.0247 18.0302 22.6378 18.7818 21.9238C19.5334 21.2099 19.9715 20.2272 20 19.191V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7Z" fill="#E42024"/>
				<path d="M20 4H16V2C16 1.73478 15.8946 1.48043 15.7071 1.29289C15.5196 1.10536 15.2652 1 15 1H9C8.73478 1 8.48043 1.10536 8.29289 1.29289C8.10536 1.48043 8 1.73478 8 2V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5C3 5.26522 3.10536 5.51957 3.29289 5.70711C3.48043 5.89464 3.73478 6 4 6H20C20.2652 6 20.5196 5.89464 20.7071 5.70711C20.8946 5.51957 21 5.26522 21 5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM10 4V3H14V4H10Z" fill="#E42024"/>
				<path d="M11 17V10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17Z" fill="#E42024"/>
				<path d="M15 17V10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9C13.7348 9 13.4804 9.10536 13.2929 9.29289C13.1054 9.48043 13 9.73478 13 10V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17Z" fill="#E42024"/>
			</svg>
		</Button>
	</div>
};

export default CartItem;
