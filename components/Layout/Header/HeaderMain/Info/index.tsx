import { FC } from 'react';
import { useLocale } from 'next-intl';
import DOMPurify from 'isomorphic-dompurify';
import { SettingsProps } from '@/models/settings';
import * as Icons from '@/components/UI/Icons';
import { Language } from '@/models/language';

interface Props {
	settings: SettingsProps
}

const Info: FC<Props> = ({ settings }) => {
	const locale = useLocale();
	const lang = locale === Language.UK ? 'ua' : 'ru';

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy']
		});
		return (
			<div
				className=''
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<div className='flex items-center gap-4'>
			<div className='flex items-center gap-3'>
				<Icons.PhoneCircuitIcon className='stroke-primary'/>
				<a href={ `tel:${ settings.ua.config_telephone_kievstar }` } className='font-medium text-black dark:text-white'>
					{ settings.ua.config_telephone_kievstar_url }
				</a>
			</div>
			<div className='flex items-center gap-3'>
				<Icons.CalendarIcon className='fill-primary'/>
				<HtmlContent htmlString={ settings[lang].config_open || '' } />
			</div>
		</div>
	)
};

export default Info;
