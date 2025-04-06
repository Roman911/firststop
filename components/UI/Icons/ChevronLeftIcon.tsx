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
		<path d="M18 23L7 12L18 1" />
	</svg>
);

export default ChevronDownIcon;
