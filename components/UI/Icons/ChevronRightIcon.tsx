import { SVGProps } from 'react';

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={ 2 }
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path d="M6 23L17 12L6 1" />
	</svg>
);

export default ChevronDownIcon;
