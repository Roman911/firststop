import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';

async function getProducts(id: string) {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?typeproduct=5&categories=${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
	});
	return await res.json();
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
	const { category } = await params;
	const products = await getProducts(category);

	const path = [
		{
			title: 'accessories',
			href: '/accessories',
			translations: true
		},
		{
			title: 'categories',
			href: '/',
			translations: true
		}
	];

	return (
		<LayoutWrapper className='max-w-7xl'>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title='categories' translations={ true } className='mt-3 text-lg font-medium px-0 md:px-3 mb-6 md:mb-1' />
			{ products.result ? <ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={ products.data } categories='ccessories'
			/> : <NoResult noResultText='no result' /> }
		</LayoutWrapper>
	)
};
