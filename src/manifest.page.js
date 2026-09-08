export const lang = ['en', 'fr'];
export const en = { url: '/manifest-en.json' };
export const fr = { url: '/manifest-fr.json' };

/**
 * @param {object} data - The site's data object.
 */
export default function manifest(data) {
	JSON.stringify(
		{
			name: data.site[data.lang].name,
			icons: [
				{
					src: '/icon-192.png',
					type: 'image/png',
					sizes: '192x192',
					purpose: 'any maskable',
				},
				{
					src: '/icon-512.png',
					type: 'image/png',
					sizes: '512x512',
				},
			],
		},
		undefined,
		2,
	);
}
