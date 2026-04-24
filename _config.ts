import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import esbuild from "lume/plugins/esbuild.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import nav from "lume/plugins/nav.ts";
import sitemap from "lume/plugins/sitemap.ts";
import robots from "lume/plugins/robots.ts";
import terser from "lume/plugins/terser.ts";
import siteConfig from "./src/_data/site.json" with { type: "json" };

const site = lume({
  src: "./src",
  jsFile: "/assets/scripts/app.js",
  cssFile: "/assets/styles/app.css",
  fontsFolder: "/assets/fonts",
  location: new URL(siteConfig.en.url),
});

site.use(multilanguage({
  languages: ["en", "fr"],
  defaultLanguage: "en",
}));
site.use(sitemap({
  query: "unlisted!=true",
  sort: "date=desc",
}));
site.use(nav());

site.use(esbuild());
site.use(terser());
site.add("/assets/scripts/app.js");

site.use(googleFonts({
  fonts:
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,200..800;1,200..800&display=swap",
}));
site.use(lightningCss());
site.add("/assets/styles/app.css");

site.copy("admin/config.yml");
site.add("assets/fonts");
site.add("assets/icons", "");
site.add("assets/uploads");

site.use(robots({
  rules: [
    {
      userAgent: "*",
      disallow: "/admin",
    },
    {
      userAgent: "*",
      disallow: "/lib",
    },
    {
      userAgent: "*",
      disallow: "/404.html",
    },
    {
      userAgent: "*",
      disallow: "/fr/404.html",
    },
  ],
}));

site.process([".html"], (pages: Lume.Page[]) => {
  for (const page of pages) {
    for (const img of page.document.querySelectorAll("main article img")) {
      if (!img.hasAttribute("alt")) {
        img.setAttribute("loading", "lazy");
      }
    }
  }
});

export default site;
