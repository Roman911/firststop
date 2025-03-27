import { SVGProps } from 'react';

const SunIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		strokeWidth={ 2 }
		viewBox="0 0 24 24"
		{ ...props }
	>
		<circle cx="12" cy="12" r="4"></circle>
		<path d="M12 2v2"></path>
		<path d="M12 20v2"></path>
		<path d="m4.93 4.93 1.41 1.41"></path>
		<path d="m17.66 17.66 1.41 1.41"></path>
		<path d="M2 12h2"></path>
		<path d="M20 12h2"></path>
		<path d="m6.34 17.66-1.41 1.41"></path>
		<path d="m19.07 4.93-1.41 1.41"></path>
	</svg>
);

export default SunIcon;
