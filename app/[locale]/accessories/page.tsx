import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import Item from '@/components/Accessories/Item';

async function getAllCategories() {
	const res = await fetch(`${process.env.SERVER_URL}/api/getCategory/8`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
	});
	return await res.json();
}

export default async function Accessories() {
	const categories = await getAllCategories();

	const path = [
		{
			title: 'accessories',
			href: '/',
			translations: true
		}
	];

	return (
		<LayoutWrapper className='max-w-7xl'>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title='accessories' translations={ true } className='mt-3 text-lg font-medium px-0 md:px-3 mb-6 md:mb-1' />
			<div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
				{ categories.children.map((category: { image: string | null, slug: string, category_id: number }, index: number) => (
					<Item key={ index } id={ category.category_id } href='accessories' image={ category.image } slug={ category.slug } />
				)) }
			</div>
		</LayoutWrapper>
	)
};
