export interface ApiProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface CatalogEntry {
  id: string;
  title: string;
  href: string;
  version: string;
  aliases: string[];
  keywords: string[];
  api: { name: string; props: ApiProp[] }[];
}
