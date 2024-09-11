import { useState } from "react";
import useMinter from "../hooks/useMinter";
import { NftMetadata } from "../utils/types";
import {
  useCollectionMetadataUrlStore,
  useNftMetadataUrlStore,
  useTransactionStateStore,
} from "../store/minterStore";

export default function MetadataUploader({
  type,
}: {
  type: "collection" | "nft";
}) {
  const { uploadMetadata } = useMinter();
  const [metadata, setMetadata] = useState<NftMetadata>({
    name: "",
    image: "",
  });

  const setCollectionUrl = useCollectionMetadataUrlStore(
    (state) => state.setUrl,
  );
  const setNftUrl = useNftMetadataUrlStore((state) => state.setUrl);

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress,
  );

  const handleUpload = async () => {
    if (!metadata) {
      return;
    }

    const metadataUri = await uploadMetadata(metadata);

    if (!metadataUri) {
      return;
    }

    switch (type) {
      case "collection":
        setCollectionUrl(metadataUri);
        break;

      case "nft":
        setNftUrl(metadataUri);
        break;
    }

    setMetadata({
      name: "",
      image: "",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input
        onChange={(event) => {
          setMetadata((currentMetadata) => ({
            ...currentMetadata,
            name: event.target.value,
          }));
        }}
        type="text"
        required
        placeholder="Name"
        className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
      />
      <input
        onChange={(event) => {
          setMetadata((currentMetadata) => ({
            ...currentMetadata,
            description: event.target.value,
          }));
        }}
        type="text"
        required
        placeholder="Description"
        className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
      />

      <input
        onChange={(event) => {
          setMetadata((currentMetadata) => ({
            ...currentMetadata,
            image: event.target.value,
            properties: {
              files: [
                {
                  uri: event.target.value,
                  type: "",
                },
              ],
              category: "image",
            },
          }));
        }}
        type="text"
        required
        placeholder="Image url"
        className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
      />
      <input
        onChange={(event) => {
          setMetadata((currentMetadata) => ({
            ...currentMetadata,
            external_url: event.target.value,
          }));
        }}
        type="text"
        placeholder="External url"
        className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
      />

      <div>Attributes:</div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
        {metadata.attributes?.map((value, i) => (
          <>
            <input
              key={`trait-${i}`}
              onChange={(event) => {
                setMetadata((currentMetadata) => {
                  const newAttributes = [...currentMetadata.attributes!];

                  newAttributes[i].trait_type = event.target.value;

                  return {
                    ...currentMetadata,
                    attributes: newAttributes,
                  };
                });
              }}
              value={value.trait_type}
              type="text"
              required
              placeholder="Trait type"
              className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
            />
            <input
              key={`value-${i}`}
              onChange={(event) => {
                setMetadata((currentMetadata) => {
                  const newAttributes = [...currentMetadata.attributes!];

                  newAttributes[i].value = event.target.value;

                  return {
                    ...currentMetadata,
                    attributes: newAttributes,
                  };
                });
              }}
              value={value.value}
              type="text"
              required
              placeholder="Description"
              className="col-span-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-1 sm:text-sm"
            />
          </>
        ))}

        <div className="grid-cols-1 items-center sm:grid-cols-2">
          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={transactionInProgress || !metadata}
            onClick={() =>
              setMetadata((currentMetadata) => {
                const attributes = currentMetadata.attributes;

                if (attributes) {
                  attributes?.push({
                    trait_type: "",
                    value: "",
                  });

                  return {
                    ...currentMetadata,
                    attributes: attributes,
                  };
                }

                return {
                  ...currentMetadata,
                  attributes: [
                    {
                      trait_type: "",
                      value: "",
                    },
                  ],
                };
              })
            }
          >
            Add attribute
          </button>
        </div>
      </div>

      <div className="grid-cols-1 items-center sm:grid-cols-2">
        <button
          type="button"
          className="btn btn-md btn-black"
          disabled={transactionInProgress || !metadata}
          onClick={handleUpload}
        >
          Upload Metadata
        </button>
      </div>
    </div>
  );
}
