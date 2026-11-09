import { parseHTML } from 'linkedom';

/**
 * @param {string} value - The HTML to be transformed.
 * @param {string} outputPath - The path of the resulting file.
 * @returns {string} The transformed HTML.
 */
export default function parseTransform(value, outputPath) {
	if (outputPath && outputPath.includes('.html')) {
		const { document } = parseHTML(value);

		const articleImages = document.querySelectorAll('article img');

		for (const image of articleImages) {
			const container = image.parentNode;
			const figure = document.createElement('figure');
			figure.append(image);
			if (image.hasAttribute('title')) {
				const caption = image.getAttribute('title');
				image.removeAttribute('title');
				const figcaption = document.createElement('figcaption');
				figcaption.textContent = caption;
				figure.append(figcaption);
			}

			container.before(figure);
			container.remove();
		}

		const pageNavHeadings = document.querySelectorAll('main:has(nav) article h2');
		const navContainer = document.querySelector('main nav.sidebar-menu #toc ul');
		for (const heading of pageNavHeadings) {
			const link = document.createElement('a');
			link.setAttribute('href', `#${heading.id}`);
			link.innerHTML = heading.textContent;
			const li = document.createElement('li');
			li.append(link);

			if (!(navContainer && heading.tagName === 'H2')) {
				continue;
			}

			li.dataset.level = '2';
			navContainer.append(li);
		}

		for (const footnote of document.querySelectorAll('[role="doc-endnote"]')) {
			const backlink = footnote.querySelector('[role="doc-backlink"]');
			const br = document.createElement('br');
			backlink.parentNode.insertBefore(br, backlink);
		}

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
}
