import { initSeo } from "~/packages/remix-seo";

const title = "Huy Pham - @quochuydev";

export let description = {
  en: [
    "Hi everyone, I'm Huy Pham a website developer",
    "I am looking for a partime job",
    "Contact me: quochuy.dev@gmail.com",
  ],
};

export let { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  description: description.en.join(" "),
  languageAlternates: [
    {
      href: "https://fb.com/quochuydev/?lng=en",
      hrefLang: "en",
    },
    {
      href: "https://fb.com/quochuydev/?lng=es",
      hrefLang: "es",
    },
  ],
  twitter: {
    card: "summary_large_image",
    creator: {
      id: "quochuydev",
    },
    site: {
      id: "quochuydev",
    },
  },
});
