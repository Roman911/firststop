'use client'
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import * as Icons from '../../UI/Icons';

// Helper function to update local storage
const updateStorage = (storageKey: string, id: number, section: string, shouldRemove: boolean) => {
	if(shouldRemove) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};

interface ActionsBlockProps {
	id: number
	className: string
	section: string
}

const ActionsBlock: FC<ActionsBlockProps> = ({ id, className, section }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const isBookmarks = bookmarksItems.some(item => item.id === id);

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks({ id, section }));
		updateStorage('reducerBookmarks', id, section, isBookmarks);
	};

	return (
		<div className={ twMerge('gap-1.5 xl:gap-2.5 h-full', className) }>
			<Button onPress={ handleClickBookmarks } isIconOnly aria-label='heart' size='lg' radius='sm' className='bg-gray-100 group'>
				<Icons.HeartIcon
					className={ twMerge('w-5 h-5 stroke-black group-hover:stroke-primary', isBookmarks && 'fill-primary stroke-primary') }/>
			</Button>
		</div>
	)
};

export default ActionsBlock;
