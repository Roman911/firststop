import { FC } from 'react';

interface QuantityProps {
	id: number
	price?: string
	quantity: number
	offerQuantity: number
	onChange: (e: { target: HTMLInputElement }) => void
	setQuantity: (id: number, quantity: number) => void
}

const Quantity: FC<QuantityProps> = ({ id = 0, price = 0, quantity, offerQuantity, onChange, setQuantity }) => {
	return <div className='quantity flex items-center'>
		<div className='flex gap-1.5'>
			<button
				onClick={() => setQuantity(id,quantity > 1 ? quantity - 1 : 1)}
				className='p-2 w-10 text-center font-bold rounded-sm text-[#575C66] border-1 border-gray-500 hover:bg-[#D2D3D6] transition'>-
			</button>
			<input
				onChange={e => onChange(e)}
				className='w-10 rounded-sm border border-gray-500 text-center font-medium'
				value={ quantity }
				placeholder='1'
				type="text"
			/>
			<button
				onClick={() => setQuantity(id,quantity < offerQuantity ? quantity + 1 : offerQuantity)}
				className='p-2 w-10 text-center font-bold rounded-sm text-[#575C66] border-1 border-gray-500 hover:bg-[#D2D3D6] transition'>+
			</button>
		</div>
		{ price !== 0 && <div className='ml-6 text-lg font-bold'>
			{ +price * (quantity ?? 0) } ₴
		</div> }
	</div>
};

export default Quantity;
