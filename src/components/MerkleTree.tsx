import { useState } from "react";
import { publicKey } from "@metaplex-foundation/umi";
import {
  useMerkleTreeAddressStore,
  useTransactionStateStore,
} from "../store/minterStore";
import useMinter from "../hooks/useMinter";
import { toast } from "react-toastify";

export default function MerkleTree() {
  const { createMerkleTree } = useMinter();
  const [address, setAddress] = useState("");
  const [maxDepth, setMaxDepth] = useState("");
  const [maxBufferSize, setMaxBufferSize] = useState("");
  const [canopyDepth, setCanopyDepth] = useState("");

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress,
  );

  const merkleTreeAddress = useMerkleTreeAddressStore(
    (state) => state.merkleTreeAddress,
  );
  const setMerkleTreeAddress = useMerkleTreeAddressStore(
    (state) => state.setMerkleTreeAddress,
  );

  const handleCreateMerkleTree = async () => {
    let maxDepthNumber: number,
      maxBufferSizeNumber: number,
      canopyDepthNumber: number;

    try {
      maxDepthNumber = Number.parseInt(maxDepth);
      maxBufferSizeNumber = Number.parseInt(maxBufferSize);
      canopyDepthNumber = Number.parseInt(canopyDepth);
    } catch (_error) {
      toast.error("Invalid airdrop amount");

      return;
    }

    await createMerkleTree(
      maxDepthNumber,
      maxBufferSizeNumber,
      canopyDepthNumber,
    );

    setMaxDepth("");
    setMaxBufferSize("");
    setCanopyDepth("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h3 className="pb-4 text-xl font-semibold">Merkle tree</h3>

      <div className="grid w-full gap-4 rounded-md bg-white p-4 shadow">
        <div className="break-all">
          Address: {merkleTreeAddress?.toString()}
        </div>
        <div className="break-all">
          <a
            href="https://compressed.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calculator
          </a>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={transactionInProgress || !address}
            onClick={() => {
              setMerkleTreeAddress(publicKey(address));

              setAddress("");
            }}
          >
            Set Merkle Tree Address
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="number"
            placeholder="Max depth"
            step={1}
            min={0}
            value={maxDepth}
            onChange={(event) => {
              setMaxDepth(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <input
            type="number"
            placeholder="Max buffer size"
            step={1}
            min={0}
            value={maxBufferSize}
            onChange={(event) => {
              setMaxBufferSize(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <input
            type="number"
            placeholder="Canopy depth"
            step={1}
            min={0}
            value={canopyDepth}
            onChange={(event) => {
              setCanopyDepth(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={
              transactionInProgress ||
              !maxDepth ||
              !maxBufferSize ||
              !canopyDepth
            }
            onClick={handleCreateMerkleTree}
          >
            Create Merkle Tree
          </button>
        </div>
      </div>
    </div>
  );
}
