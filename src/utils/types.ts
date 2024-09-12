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
  uri: string;
  type: string;
  cdn?: boolean;
};

export type Category = "video" | "image";

const _metadata: NftMetadata = {
  name: "Dujo Perdić",
  description:
    "I'm a web2 and web3 developer based in Croatia. Connect with me and lets work together!",
  image: "imageUrl",
  external_url: "https://linkedin.com/in/dujo-perdic",
  attributes: [
    {
      trait_type: "LinkedIn",
      value: "https://linkedin.com/in/dujo-perdic",
    },
    {
      trait_type: "Github",
      value: "https://github.com/dperdic",
    },
    {
      trait_type: "Telegram",
      value: "@dperdic",
    },
    {
      trait_type: "Discord",
      value: "dperdic",
    },
    {
      trait_type: "X / Twitter",
      value: "https://x.com/DPerdic",
    },
  ],
  properties: {
    files: [
      {
        uri: "imageUrl",
        type: "image/jpeg",
      },
    ],
    category: "image",
  },
};
