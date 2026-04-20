import {env} from 'node:process';
import fluidPlugin from 'eleventy-plugin-fluid';
import fontAwesomePlugin from '@11ty/font-awesome';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import {RenderPlugin} from '@11ty/eleventy';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';

// Import transforms
import parseTransform from './src/_transforms/parse-transform.js';

/**
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy(eleventyConfig) {
	// Global Data
	// eleventyConfig.addGlobalData('now', () => new Date());

	// Filters
	eleventyConfig.addFilter('findTranslation', (page, collection = [], lang, desiredLang) => {
		const expectedFilePathStem = page.filePathStem.replace(lang, desiredLang);

		let translationUrl = false;

		for (const element of collection) {
			if (element.filePathStem === expectedFilePathStem) {
				translationUrl = element.url;
			}
		}

		return translationUrl;
	});

	// Shortcodes
	eleventyConfig.addShortcode('uioCustomInit', (locale, direction) => {
		const options = {
			preferences: ['fluid.prefs.lineSpace', 'fluid.prefs.textFont', 'fluid.prefs.contrast', 'fluid.prefs.enhanceInputs'],
			auxiliarySchema: {
				terms: {
					templatePrefix: '/lib/infusion/src/framework/preferences/html',
					messagePrefix: '/lib/infusion/src/framework/preferences/messages',
				},
			},
			prefsEditorLoader: {
				lazyLoad: true,
			},
			locale,
			direction,
		};

		return `<script>fluid.uiOptions.multilingual(".flc-prefsEditor-separatedPanel", ${JSON.stringify(options)});</script>`;
	});

	// Transforms
	eleventyConfig.addTransform('parse', parseTransform);

	// Passthrough
	eleventyConfig.addPassthroughCopy({'src/admin/config.yml': 'admin/config.yml'});
	eleventyConfig.addPassthroughCopy({'src/assets/icons': '/'});
	eleventyConfig.addPassthroughCopy('src/assets/images');
	eleventyConfig.addPassthroughCopy('src/assets/messages');

	// Plugins
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(fluidPlugin, {
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
	eleventyConfig.addPlugin(fontAwesomePlugin);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	// Preprocessors
	eleventyConfig.addPreprocessor('drafts', '*', (data, _content) => {
		if (data.draft && env.ELEVENTY_RUN_MODE === 'build') {
			return false;
		}
	});

	return {
		dir: {
			input: 'src',
		},
		templateFormats: ['njk', 'md', 'css', 'png', 'jpg', 'svg'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	};
}
