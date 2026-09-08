import MarkdownIt from 'markdown-it';
import { __ } from 'eleventy-plugin-fluid';

/**
 * @param {string} value - The input string to render into HTML.
 * @returns {string} - Rendered HTML.
 */
export default function markdownFilter(value) {
	const md = new MarkdownIt();
	return md.render(value);
}
