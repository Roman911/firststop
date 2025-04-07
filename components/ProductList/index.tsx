import { FC } from 'react';
import ProductCard from './Card';
import type { Data } from '@/models/products';

interface Props {
	classnames?: string
	data: Data
	categories?: string
}

const ProductList: FC<Props> = ({ classnames, data, categories }) => {
	const products = data.products.map(item => {
		return <ProductCard key={ item.group } item={ item } categories={ categories } />
	})

	return (
		<div className={`grid gap-4 ${classnames}`}>
			{ products }
		</div>
	)
};

export default ProductList;
