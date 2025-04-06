'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import * as Icons from '@/components/UI/Icons';
import { Button } from '@heroui/button';

const images = [
	[
		{ img: '01', link: '29' },
		{ img: '02', link: '36' },
		{ img: '03', link: '153' },
		{ img: '04', link: '102' },
	],
	[
		{ img: '05', link: '87' },
		{ img: '06', link: '48' },
		{ img: '07', link: '177' },
		{ img: '08', link: '232' }
	]
];

const imagesMobile = [
	{ img: '01', link: '29' },
	{ img: '02', link: '36' },
	{ img: '03', link: '153' },
	{ img: '04', link: '102' },
	{ img: '05', link: '87' },
	{ img: '06', link: '48' },
	{ img: '07', link: '177' },
	{ img: '08', link: '232' }
]

const TopBrands = () => {
	const [ current, setCurrent ] = useState(0);

	const nextSlide = () => {
		if(current < images.length - 1) {
			setCurrent(prev => prev + 1);
		} else {
			setCurrent(0);
		}
	}

	const prevSlide = () => {
		if(current === 0) {
			setCurrent(images.length - 1);
		} else {
			setCurrent(prev => prev - 1);
		}
	}

	const nextSlideMobile = () => {
		if(current < imagesMobile.length - 1) {
			setCurrent(prev => prev + 1);
		} else {
			setCurrent(0);
		}
	}

	const prevSlideMobile = () => {
		if(current === 0) {
			setCurrent(imagesMobile.length - 1);
		} else {
			setCurrent(prev => prev - 1);
		}
	}

	return (
		<div className='border border-gray-400 mt-10'>
			<div className="relative overflow-hidden rounded-sm p-2 sm:p-4">
				<Button onPress={ prevSlide } isIconOnly variant='light'
								className='hidden md:flex absolute left-5 top-1/2 z-10 -translate-y-1/2'>
					<Icons.ChevronLeftIcon className='stroke-gray-500'/>
				</Button>

				<Button onPress={ nextSlide } isIconOnly variant='light'
								className='hidden md:flex absolute right-5 top-1/2 z-10 -translate-y-1/2'>
					<Icons.ChevronRightIcon className='stroke-gray-500'/>
				</Button>

				<Button onPress={ prevSlideMobile } isIconOnly variant='light'
								className='md:hidden absolute left-5 top-1/2 z-10 -translate-y-1/2'>
					<Icons.ChevronLeftIcon className='stroke-gray-500'/>
				</Button>

				<Button onPress={ nextSlideMobile } isIconOnly variant='light'
								className='md:hidden absolute right-5 top-1/2 z-10 -translate-y-1/2'>
					<Icons.ChevronRightIcon className='stroke-gray-500'/>
				</Button>

				<div className='relative h-16 w-5/6 mx-auto'>
					<div className='hidden md:block'>
						{ images.map((item, index) => {
							return (
								<div key={ index }
										 className={ twMerge('transition transform duration-300 opacity-0 absolute top-0 p-1.5 flex items-center justify-between w-full', index === current && 'opacity-100 z-10') }>
									{ item.map(i => {
										return (
											<Link key={ i.img } href={ `/catalog/tires/b-${ i.link }` }>
												<Image src={ `/images/top_brands/${ i.img }.webp` } alt='' width={ 140 } height={ 40 }/>
											</Link>
										)
									}) }
								</div>
							)
						}) }
					</div>
					<div className='md:hidden'>
						{ imagesMobile.map((item, index) => {
							return (
								<div key={ index }
										 className={ twMerge('transition transform duration-300 opacity-0 absolute top-0 p-1.5 flex items-center justify-center w-full', index === current && 'opacity-100 z-10') }>
									<Link href={ `/catalog/tires/b-${ item.link }` }>
										<Image src={ `/images/top_brands/${ item.img }.webp` } alt='' width={ 140 } height={ 40 }/>
									</Link>
								</div>
							)
						}) }
					</div>
				</div>
			</div>
		</div>
	)
};

export default TopBrands;
