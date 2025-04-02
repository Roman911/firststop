import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';

async function getProducts() {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?typeproduct=5&categories=7`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
	});
	return await res.json();
}

export default async function Oil() {
	const products = await getProducts();

	const path = [
		{
			title: 'oil',
			href: '/',
			translations: true
		}
	];

	return (
		<LayoutWrapper className='max-w-7xl'>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title='oil' translations={ true } className='mt-3 text-lg font-medium px-0 md:px-3 mb-6 md:mb-1' />
			{ products.result ? <ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={ products.data } categories='oil'
			/> : <NoResult noResultText='no result' /> }
		</LayoutWrapper>
	)
};
