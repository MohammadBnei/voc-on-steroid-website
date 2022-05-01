interface FetchOptions {
	timeout: number;
	endpointUri: string;
}

export const navLinks = [
	{
		href: '/account/profile',
		title: 'Profil 🚧',
		connected: true,
	},
	{
		href: '/assoc',
		title: 'Liste personnelle',
		connected: true,
	},
	{
		href: '/about',
		title: 'À propos',
	},
];

export const fetchOptions: FetchOptions = {
	timeout: 10000,
	endpointUri: '/endpoint/',
};
