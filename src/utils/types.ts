// schema: https://developers.metaplex.com/token-metadata/token-standard#the-non-fungible-standard

export type NftMetadata = {
  name: string;
  description?: string;
  image: string;
  animation_url?: string;
  external_url?: string;
  attributes?: NftAttribute[];
  properties?: Properties;
};

export type NftAttribute = {
  trait_type: string;
  value: string;
};

export type Properties = {
  files: NftFile[];
  category: Category;
};

export type NftFile = {
  uri?: string;
  type?: string;
  cdn?: boolean;
};

export type Category = "video" | "image";
