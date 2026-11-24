import type { CatalogEntry } from "./catalog-types.js";

interface SearchResult {
  title: string;
  href: string;
  match?: string;
}

function normalize(text: string) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

const guides = [
  { title: "Overview", href: "/", terms: ["introduction", "getting started"] },
  {
    title: "Examples guide",
    href: "/guides/examples/",
    terms: ["preview", "copy", "source", "code"],
  },
];

export function searchDocs(
  catalog: readonly CatalogEntry[],
  query: string,
): SearchResult[] {
  const phrase = normalize(query);
  if (!phrase) return [];
  const words = phrase.split(" ");
  const candidates = [
    ...catalog.map(({ title, href, id, aliases, keywords, api }) => ({
      title,
      href,
      names: [title, id, ...aliases],
      props: api.flatMap(({ props }) => props.map(({ name }) => name)),
      keywords,
    })),
    ...guides.map(({ title, href, terms }) => ({
      title,
      href,
      names: [title],
      props: [],
      keywords: terms,
    })),
  ];

  return candidates
    .flatMap(({ title, href, names, props, keywords }) => {
      const normalizedNames = names.map(normalize);
      const matchProp = props.find((prop) => normalize(prop) === phrase);
      const indexed = [
        ...normalizedNames,
        ...props.map(normalize),
        ...keywords.map(normalize),
      ];
      if (!words.every((word) => indexed.some((value) => value.includes(word))))
        return [];
      const exactName = normalizedNames.includes(phrase);
      const startsWith = normalizedNames.some((name) =>
        name.startsWith(phrase),
      );
      return [
        {
          title,
          href: matchProp && !exactName ? `${href}#api-reference` : href,
          match: matchProp,
          score: exactName ? 3 : startsWith ? 2 : matchProp ? 1 : 0,
        },
      ];
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 8)
    .map(({ title, href, match }) => ({
      title,
      href,
      ...(match ? { match } : {}),
    }));
}
