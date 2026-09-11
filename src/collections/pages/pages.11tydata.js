export default {
	eleventyComputed: {
		eleventyNavigation(data) {
			if (data.order === 0 || data.order === null) {
				return false;
			}

			const pieces = data.id.split('/');

			const eleventyNavigation = {
				key: pieces.at(-2),
				title: data.title,
				order: data.order,
			};

			if (pieces.at(-3)) {
				eleventyNavigation.parent = pieces.at(-3);
			}

			return eleventyNavigation;
		},
		permalink(data) {
			return `${data.page.filePathStem.replace('/collections/pages', '')}.html`;
		},
	},
};
