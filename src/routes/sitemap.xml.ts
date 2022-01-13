import fs from 'fs';

const URL = process.env.BASE_URL;
const BASE_URL = URL ? URL : 'https://voconsteroid.com';
const pages = [ '', 'about', 'account', 'assoc', 'endpoint', 'experimental' ];

const render = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
		.map(
			(page: string) => `
	<url>
		<loc>
			${BASE_URL}/${page ? `${page}` : ''}
		</loc>
		<priority>0.85</priority>
	</url>
`,
		)
		.join('\n')}
</urlset>
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get() {
	console.log({ pages, BASE_URL, URL })
	const sitemap = render(pages);

	return {
		body: sitemap,
		log: { pages, BASE_URL, URL }
	};
}
