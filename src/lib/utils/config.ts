interface FetchOptions {
	timeout: number;
	endpointUri: string;
}

export const navLinks = [
	{
		href: '/account/profile',
		title: 'Account 🚧',
		connected: true,
	},
	{
		href: '/assoc',
		title: 'Your Words 🚧',
		connected: true,
	},
	{
		href: '/about',
		title: 'About',
	},
];

export const fetchOptions: FetchOptions = {
	timeout: 2000,
	endpointUri: '/endpoint/',
};
