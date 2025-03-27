import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
	description: string;
}

const TextSeo: FC<Props> = ({ description })=> {
	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className='flex-1'
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<div className='mt-12 md:mt-20 mb-14 md:mb-24'>
			<HtmlContent htmlString={ description } />
		</div>
	)
}

export default TextSeo;
