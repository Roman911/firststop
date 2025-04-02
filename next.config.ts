import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		HOSTNAME: process.env.HOSTNAME,
		HOSTNAME_TYRECLUB: process.env.HOSTNAME,
		ACCESS_ORIGIN: process.env.ACCESS_ORIGIN,
	},
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'gate-opt.tyreclub.com.ua',
				pathname: '/public/img/user/**',
			},
			{
				protocol: 'https',
				hostname: 'admin.firststop.com.ua',
				pathname: '**',
			},
		],
	},
};

export default withNextIntl(nextConfig);
