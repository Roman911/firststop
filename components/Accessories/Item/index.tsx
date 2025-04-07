'use client'
import { FC } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Props {
	id: number
	href: string
	image: string | null
	slug: string
}

const Item: FC<Props> = ({ id, href, image, slug }) => {
	const t = useTranslations('Accessories');

	return (
		<Link href={ `/${href}/${id}` } className='p-4 flex flex-col items-center justify-between rounded-sm gap-6'>
			{ image ? <Image src={`${process.env.SERVER_URL}${image}`} alt='' width={ 240 } height={ 240 } /> :
				<Image src='/images/no-photo.jpg' alt='' width={ 240 } height={ 240 } /> }
			<div>{ t(slug) }</div>
		</Link>
	)
};

export default Item;
