import { useState } from "react";
import useMinter from "../hooks/useMinter";
import ImageUploader from "./ImageUploader";
import MetadataUploader from "./MetadataUploader";
import {
  useCollectionAddressStore,
  useNftImageUrlStore,
  useNftMetadataUrlStore,
  useTransactionStateStore,
} from "../store/minterStore";
import { PublicKey, publicKey } from "@metaplex-foundation/umi";
import { toast } from "react-toastify";

export default function Nft() {
  const { mintToCollection } = useMinter();

  const [localImageUrl, setLocalImageUrl] = useState("");
  const [localImageMimeType, setLocalImageMimeType] = useState("");
  const [localMetadataUrl, setLocalMetadataUrl] = useState("");

  const collectionAddress = useCollectionAddressStore((state) => state.address);

  const [localName, setLocalName] = useState("");

  const [localSymbol, setLocalSymbol] = useState("");
  const [localAddresses, setLocalAddresses] = useState("");

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress,
  );

  const imageUrl = useNftImageUrlStore((state) => state.url);
  const imageMimeType = useNftImageUrlStore((state) => state.mimeType);
  const setImageUrl = useNftImageUrlStore((state) => state.setUrl);
  const setImageMimeType = useNftImageUrlStore((state) => state.setMimeType);

  const metadataUrl = useNftMetadataUrlStore((state) => state.url);
  const setMetadataUrl = useNftMetadataUrlStore((state) => state.setUrl);

  const handleMintToCollection = async () => {
    if (!collectionAddress || !metadataUrl) {
      return;
    }

    let addresses: PublicKey[];

    try {
      addresses = localAddresses.split(",").map((x) => publicKey(x.trim()));
    } catch (error) {
      toast.error("One or more addresses invalid");
      console.error(error);

      return;
    }

    await mintToCollection(localName, localSymbol, metadataUrl, addresses);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h3 className="pb-4 text-xl font-semibold">cNFT</h3>

      <div className="grid w-full gap-8 rounded-md bg-white p-4 shadow">
        <div className="flex flex-col gap-2 break-all">
          <div>Image url: {imageUrl}</div>
          <div>Image mimeType: {imageMimeType}</div>
          <div>Metadata url: {metadataUrl}</div>
        </div>

        <div className="flex flex-col gap-3">
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

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Name"
              value={localName}
              onChange={(event) => {
                setLocalName(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />

            <input
              type="text"
              placeholder="Symbol"
              value={localSymbol}
              onChange={(event) => {
                setLocalSymbol(event.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
            />
          </div>

          <textarea
            rows={2}
            placeholder="Comma separated addreses"
            value={localAddresses}
            onChange={(event) => {
              setLocalAddresses(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <div className="text-center">
            <button
              type="button"
              className="btn btn-md btn-black"
              disabled={
                transactionInProgress ||
                !collectionAddress ||
                !localName ||
                !localSymbol ||
                !localAddresses ||
                !metadataUrl
              }
              onClick={handleMintToCollection}
            >
              Mint NFTs
            </button>
          </div>
        </div>

        <ImageUploader type="nft" />

        <MetadataUploader type="nft" />
      </div>
    </div>
  );
}
