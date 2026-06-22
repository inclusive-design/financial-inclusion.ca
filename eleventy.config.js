import { env } from 'node:process';
import { IdAttributePlugin, RenderPlugin } from '@11ty/eleventy';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { VentoPlugin } from 'eleventy-plugin-vento';
import fontAwesomePlugin from '@11ty/font-awesome';
import fluidPlugin, { __ } from 'eleventy-plugin-fluid';
import _ from 'lodash';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import parseTransform from './src/_transforms/parse-transform.js';
import findTranslationKeyFilter from './src/_filters/find-translation-key-filter.js';
import markdownFilter from './src/_filters/markdown-filter.js';

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig An instance of Eleventy's UserConfig class.
 * @returns {object} The configuration object.
 */
export default function eleventy(eleventyConfig) {
	eleventyConfig.addGlobalData('now', () => new Date());
	eleventyConfig.addPlugin(fontAwesomePlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(VentoPlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(fluidPlugin, {
		uio: false,
		css: { enabled: false },
		js: { enabled: false },
		defaultLanguage: 'en',
		supportedLanguages: {
			en: {
				slug: 'en',
				name: 'English',
			},
			fr: {
				slug: 'fr',
				name: 'Français',
				dir: 'ltr',
				uioSlug: 'fr',
			},
		},
	});
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			plugins: [],
		},
	});

	for (const lang of ['en', 'fr']) {
		eleventyConfig.addCollection(
			`pages_${lang}`,
			(collection) => collection
				.getFilteredByGlob(`src/collections/pages/${lang}/*.md`),
		);
	}

	eleventyConfig.addFilter('findTranslationKey', findTranslationKeyFilter);
	eleventyConfig.addFilter('markdown', markdownFilter);

	eleventyConfig.addShortcode('__', (key, values = {}, data) => __(key, values, data));

	eleventyConfig.addTransform('parse', parseTransform);

	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy('public/admin');
	eleventyConfig.addPassthroughCopy('public/assets');
	eleventyConfig.addPassthroughCopy({ 'public/icons': '/' });

	eleventyConfig.addPlugin(IdAttributePlugin);

	eleventyConfig.addPreprocessor('drafts', '*', (data, _content) => {
		if (data.draft && env.ELEVENTY_RUN_MODE === 'build') {
			return false;
		}
	});

	return {
		dir: {
			input: 'src',
		},
		templateFormats: ['vto', 'md'],
		htmlTemplateEngine: 'vto',
		markdownTemplateEngine: 'vto',
	};
}
