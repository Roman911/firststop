import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Photo } from '@/models/product';
import { Language } from '@/models/language';
import InlinePlugin from '@/components/Product/ImagesBlock/ImageGallery';

interface Props {
	locale: Language;
	images: Photo[]
	full_name: string
	photo: {
		url_part: string
		url_part2: string
	}
}

const ImagesBlock: FC<Props> = ({ locale, images, photo, full_name }) => {
	return (
		<div className={ twMerge('gallery relative mb-7 pt-10 pb-5') }>
			{ photo?.url_part === '' ?
				<Image
					src={ locale === Language.UK ? '/images/no-photo.jpg' : '/images/no-photo-ru.jpg' }
					width={ 410 }
					height={ 410 }
					alt={ full_name }
				/> :
				<InlinePlugin images={ images } photo={ photo }/> }
		</div>
	)
}

export default ImagesBlock;
