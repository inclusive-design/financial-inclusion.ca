# Financial Inclusion and Resilience Movement

The Financial Inclusion and Resilience Movement (FIRM) website.

## Usage

The site is built with [Eleventy](https://11ty.dev) and uses [Vento](https://vento.js.org).

### Production Builds

To build a static version of the website, execute the following command:

```bash
npm run build
```

The site will be built in the `_site` directory. You can serve it locally using your preferred method for serving static
files.

### Local Development

You can run the site locally in development mode by executing the following command:

```bash
npm start
```

The site will be available at <https://localhost:8080>.

You can access the site's instance of [Sveltia CMS](https://sveltiacms.app) in Chromium-based browser by visiting <https://localhost:8080/admin/>
and selecting the site directory when prompted. Changes will be made to the local filesystem.

### Linting

[CSS](https://github.com/inclusive-design/stylelint-config), [JavaScript](https://github.com/inclusive-design/eslint-config)
and [Markdown](https://github.com/inclusive-design/markdownlint-config) can be linted using the following command:

```bash
npm run lint
```

Note that the built-in Deno formatter and linter are not currently used.

## Release Process

Changelogs and releases are handled by [release-please](https://github.com/googleapis/release-please-action). We use a
modified versioning scheme based on [calendar versioning](https://calver.org/) in the form `YYYY.MM.MICRO` (where
`MICRO`, the third and final number in the version, indicates a patch, starting at 0 within each month's sequence of releases).

Prior to release, commit and push a single commit to bump the version appropriately:

```bash
git commit --allow-empty -m "chore: prepare release

Release-As: 2026.4.2"
```

(In this example, that would be the third release for April 2026 for a given package.)

Once that commit is in the version history, release-please will update the release pull request to the new version and
it can be merged.
