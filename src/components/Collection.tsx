import { publicKey } from "@metaplex-foundation/umi";
import { useState } from "react";
import useMinter from "../hooks/useMinter";
import {
  useCollectionAddressStore,
  useCollectionImageUrlStore,
  useCollectionMetadataUrlStore,
  useTransactionStateStore,
} from "../store/minterStore";
import ImageUploader from "./ImageUploader";
import MetadataUploader from "./MetadataUploader";

export default function Collection() {
  const { createCollection } = useMinter();

  const [localAddress, setLocalAddress] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [localImageMimeType, setLocalImageMimeType] = useState("");

  const [localMetadataUrl, setLocalMetadataUrl] = useState("");

  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");

  const address = useCollectionAddressStore((state) => state.address);
  const setAddress = useCollectionAddressStore((state) => state.setAddress);

  const imageUrl = useCollectionImageUrlStore((state) => state.url);
  const imageMimeType = useCollectionImageUrlStore((state) => state.mimeType);
  const setImageUrl = useCollectionImageUrlStore((state) => state.setUrl);
  const setImageMimeType = useCollectionImageUrlStore(
    (state) => state.setMimeType,
  );

  const metadataUrl = useCollectionMetadataUrlStore((state) => state.url);
  const setMetadataUrl = useCollectionMetadataUrlStore((state) => state.setUrl);

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress,
  );

  const handleCreateCollection = async () => {
    if (!collectionName || !metadataUrl) {
      return;
    }

    await createCollection(collectionName, collectionSymbol, metadataUrl);

    setCollectionName("");
    setCollectionSymbol("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h3 className="pb-4 text-xl font-semibold">cNFT Collection</h3>

      <div className="grid w-full gap-8 rounded-md bg-white p-4 shadow">
        <div className="flex flex-col gap-2 break-all">
          <div>Address: {address?.toString()}</div>
          <div>Image url: {imageUrl}</div>
          <div>Image mimeType: {imageMimeType}</div>
          <div>Metadata url: {metadataUrl}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Address"
              value={localAddress}
              onChange={(event) => {
                setLocalAddress(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />

            <button
              type="button"
              className="btn btn-md btn-black"
              disabled={transactionInProgress || !localAddress}
              onClick={() => {
                setAddress(publicKey(localAddress));

                setLocalAddress("");
              }}
            >
              Set Address
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Image url"
              value={localImageUrl}
              onChange={(event) => {
                setLocalImageUrl(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />

            <input
              type="text"
              placeholder="Mime type"
              value={localImageMimeType}
              onChange={(event) => {
                setLocalImageMimeType(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />

            <button
              type="button"
              className="btn btn-md btn-black"
              disabled={
                transactionInProgress || !localImageMimeType || !localImageUrl
              }
              onClick={() => {
                setImageUrl(localImageUrl);
                setImageMimeType(localImageMimeType);

                setLocalImageUrl("");
                setLocalImageMimeType("");
              }}
            >
              Set Image Data
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Metadata url"
              value={localMetadataUrl}
              onChange={(event) => {
                setLocalMetadataUrl(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />

            <button
              type="button"
              className="btn btn-md btn-black"
              disabled={transactionInProgress || !localMetadataUrl}
              onClick={() => {
                setMetadataUrl(localMetadataUrl);

                setLocalMetadataUrl("");
              }}
            >
              Set Metadata Url
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Name"
            value={collectionName}
            onChange={(event) => {
              setCollectionName(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <input
            type="text"
            placeholder="Symbol"
            value={collectionSymbol}
            onChange={(event) => {
              setCollectionSymbol(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={transactionInProgress || !metadataUrl || !collectionName}
            onClick={handleCreateCollection}
          >
            Create collection
          </button>
        </div>

        <ImageUploader type="collection" />

        <MetadataUploader type="collection" />
      </div>
    </div>
  );
}
