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
    attributes: [],
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
      <div className="col-span-1 sm:col-span-2">Metadata uploader</div>

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
        className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
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
        className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
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
                  type: currentMetadata?.properties?.files[0].type,
                },
              ],
              category: "image",
            },
          }));
        }}
        type="text"
        required
        placeholder="Image url"
        className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
      />

      <input
        onChange={(event) => {
          setMetadata((currentMetadata) => ({
            ...currentMetadata,
            properties: {
              files: [
                {
                  uri: currentMetadata?.properties?.files[0].uri,
                  type: event.target.value,
                },
              ],
              category: "image",
            },
          }));
        }}
        type="text"
        required
        placeholder="Mime type"
        className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
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
        className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-2 sm:text-sm"
      />

      <div className="col-span-1 sm:col-span-2">Attributes</div>

      {metadata.attributes?.map((value, i) => (
        <div key={`wrapper-${i}`} className="col-span-1 sm:col-span-2">
          <div key={`row-${i}`} className="flex flex-row gap-3">
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
              className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-2 sm:text-sm"
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
              placeholder="Value"
              className="col-span-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:col-span-2 sm:text-sm"
            />
            <button
              key={`removeButton-${i}}`}
              type="button"
              className="btn btn-sm btn-white"
              disabled={transactionInProgress || !metadata}
              onClick={() =>
                setMetadata((currentMetadata) => {
                  const newAttributes = currentMetadata.attributes!.filter(
                    (_x, idx) => idx !== i,
                  );

                  return {
                    ...currentMetadata,
                    attributes: newAttributes,
                  };
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <div className="col-span-1 text-center sm:col-span-2">
        <button
          type="button"
          className="btn btn-md btn-black"
          disabled={transactionInProgress || !metadata}
          onClick={() =>
            setMetadata((currentMetadata) => {
              const newAttributes = [...currentMetadata.attributes!];

              newAttributes.push({
                trait_type: "",
                value: "",
              });

              return {
                ...currentMetadata,
                attributes: newAttributes,
              };
            })
          }
        >
          Add attribute
        </button>
      </div>

      <div className="col-span-1 text-center sm:col-span-2">
        <button
          type="button"
          className="btn btn-md btn-black"
          disabled={
            transactionInProgress ||
            !metadata?.name ||
            !metadata.description ||
            !metadata?.image ||
            !metadata.properties?.files[0]?.type
          }
          onClick={handleUpload}
        >
          Upload Metadata
        </button>
      </div>
    </div>
  );
}
