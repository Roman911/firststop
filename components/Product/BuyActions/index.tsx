import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import QuickOrder from '@/components/Product/QuickOrder';
import { Language } from '@/models/language';
import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import { useTranslations } from 'next-intl';
import { useAppGetProducts } from '@/hooks/getProducts';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { removeCart, setQuantity } from '@/store/slices/cartSlice';
import CartComponent from '@/components/Cart';
import NoResult from '@/components/UI/NoResult';
import Spinner from '@/components/UI/Spinner';
import * as Icons from '@/components/UI/Icons';

interface Props {
	locale: Language
	offerId: number
	quantity: number
	section: Section
	data: ProductProps
	onSubmit: () => void
}

const BuyActions: FC<Props> = ({ locale, offerId, quantity, section, data, onSubmit }) => {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const t = useTranslations('Main');
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(cartItems, 'reducerCart', true);
	const dataTotal = {
		result: true,
		data: {
			total_count: 5,
			products: [...tires,...cargo,...disks,...battery]
		}
	};

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity }]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	const handleClick = () => {
		router.push(`/${ locale }/order`)
	}

	const handleClickBuy = () => {
		onSubmit();
		onOpen();
	}

	return (
		<div className='buttons-buy flex flex-col md:flex-row gap-2 mt-8'>
			{ cartItems.find(item => +item.id === offerId) ?
				<Button color='success' size='lg' radius='sm' onPress={ onOpen } className='w-full font-semibold'>
					{ t('in cart') }
				</Button> :
				<Button onPress={ handleClickBuy } color='primary' radius='sm' size='lg' className='w-full font-semibold'>
					<Icons.CartIcon />
					{ t('buy') }
				</Button>
			}
			<QuickOrder
				locale={ locale }
				offerId={ offerId }
				quantity={ quantity }
				section={ section }
				offerItem={ data?.data?.offers?.find(item => item.offer_id === +offerId) }
			/>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } size='4xl' placement='top'>
				<ModalContent>
					{ (onClose) => (
						<>
							<ModalHeader className='text-2xl'>{ t('cart') }</ModalHeader>
							<ModalBody>
								<Spinner height='h-40' show={ isLoading }>
									{ cartItems.length > 0 && dataTotal?.result ? <CartComponent
											data={ dataTotal }
											cartItems={ cartItems }
											removeProduct={ removeProduct }
											setQuantity={ onSetQuantity }
										/> :
										<NoResult noResultText='no product to cart' /> }
								</Spinner>
							</ModalBody>
							<ModalFooter className='flex-col md:flex-row'>
								<Button variant='bordered' color='primary' size='lg' className='font-semibold w-full' radius='sm' onPress={onClose}>
									{ t('continue shopping') }
								</Button>
								<Button color='primary' size='lg' className='font-semibold w-full' radius='sm' onPress={ handleClick }>
									{ t('place an order') }
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
};

export default BuyActions;
