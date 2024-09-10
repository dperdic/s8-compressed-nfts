import { useCallback, useMemo } from "react";
import {
  createTree,
  fetchMerkleTree,
  fetchTreeConfigFromSeeds,
  mintToCollectionV1,
} from "@metaplex-foundation/mpl-bubblegum";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import {
  createGenericFile,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { toast } from "react-toastify";
import useUmi from "./useUmi";
import {
  useCollectionAddressStore,
  useMerkleTreeAddressStore,
  useMerkleTreeConfigStore,
  useMerkleTreeStore,
  useTransactionStateStore,
} from "../store/minterStore";
import { NftMetadata } from "../utils/types";

export default function useMinter() {
  const { umi } = useUmi();

  const merkleTreeAddress = useMerkleTreeAddressStore(
    (state) => state.merkleTreeAddress,
  );
  const setAddress = useMerkleTreeAddressStore(
    (state) => state.setMerkleTreeAddress,
  );
  const setMerkleTree = useMerkleTreeStore((state) => state.setMekleTree);
  const setTreeConfig = useMerkleTreeConfigStore(
    (state) => state.setTreeConfig,
  );

  const collectionAddress = useCollectionAddressStore(
    (state) => state.collectionAddress,
  );
  const setCollectionAddress = useCollectionAddressStore(
    (state) => state.setCollectionAddress,
  );

  const setTransactionInProgress = useTransactionStateStore(
    (state) => state.setTransactionInProgress,
  );

  const createMerkleTree = useCallback(
    async (maxDepth: number, maxBufferSize: number, canopyDepth: number) => {
      setTransactionInProgress(true);

      if (!umi) {
        toast.error("Umi not initialized");
        setTransactionInProgress(false);

        return;
      }

      const merkleTree = generateSigner(umi);

      const builder = await createTree(umi, {
        merkleTree,
        maxDepth: maxDepth,
        maxBufferSize: maxBufferSize,
        canopyDepth: canopyDepth,
      });

      try {
        const tx = await builder.sendAndConfirm(umi, {
          confirm: {
            commitment: "confirmed",
          },
          send: {
            commitment: "confirmed",
            maxRetries: 3,
          },
        });

        setAddress(merkleTree.publicKey);

        toast.success(
          `Transaction hash: ${base58.deserialize(tx.signature)[0]}}`,
        );
      } catch (error) {
        toast.error("An error occured while creating merkle tree");
        console.error(error);
      }

      setTransactionInProgress(false);
    },
    [setAddress, setTransactionInProgress, umi],
  );

  const fetchTree = useCallback(async () => {
    setTransactionInProgress(true);

    if (!umi) {
      toast.error("Umi not initialized");
      setTransactionInProgress(false);

      return;
    }

    if (!merkleTreeAddress) {
      toast.error("No address provided");
      setTransactionInProgress(false);

      return;
    }

    try {
      const merkleTree = await fetchMerkleTree(umi, merkleTreeAddress, {
        commitment: "confirmed",
      });

      setMerkleTree(merkleTree);
    } catch (_error) {
      toast.error("An error occured while fetching merkle tree");
    }

    setTransactionInProgress(false);
  }, [merkleTreeAddress, setMerkleTree, setTransactionInProgress, umi]);

  const fetchTreeConfig = useCallback(async () => {
    setTransactionInProgress(true);

    if (!umi) {
      toast.error("Umi not initialized");
      setTransactionInProgress(false);

      return;
    }

    if (!merkleTreeAddress) {
      toast.error("No address provided");
      setTransactionInProgress(false);

      return;
    }

    try {
      const treeConfig = await fetchTreeConfigFromSeeds(
        umi,
        {
          merkleTree: merkleTreeAddress,
        },
        { commitment: "confirmed" },
      );

      setTreeConfig(treeConfig);
    } catch (_error) {
      toast.error("An error occured while fetching merkle tree config");
    }

    setTransactionInProgress(false);
  }, [merkleTreeAddress, setTransactionInProgress, setTreeConfig, umi]);

  const uploadImage = useCallback(
    async (
      content: string | Uint8Array,
      fileName: string,
      mimeType: string,
    ) => {
      if (!umi) {
        toast.error("Umi not initialized");
        setTransactionInProgress(false);

        return;
      }

      try {
        const genericUmiFile = createGenericFile(content, fileName, {
          tags: [{ name: "Content-Type", value: mimeType }],
        });

        const imageUri = await umi.uploader.upload([genericUmiFile]);

        return imageUri[0];
      } catch (error) {
        toast.error(`An error occured while uploading image: ${error}}`);

        return null;
      }
    },
    [setTransactionInProgress, umi],
  );

  const uploadMetadata = useCallback(
    async (metadata: any) => {
      if (!umi) {
        toast.error("Umi not initialized");
        setTransactionInProgress(false);

        return;
      }

      try {
        return await umi.uploader.uploadJson(metadata);
      } catch (error) {
        toast.error(`An error occured while uploading metadata: ${error}}`);

        return null;
      }
    },
    [setTransactionInProgress, umi],
  );

  const createCollection = useCallback(
    async (
      collectionName: string,
      collectionSymbol: string,
      content: string | Uint8Array,
      fileName: string,
      mimeType: string,
    ) => {
      setTransactionInProgress(true);

      if (!umi) {
        toast.error("Umi not initialized");
        setTransactionInProgress(false);

        return;
      }

      const collectionMint = generateSigner(umi);

      const imageUri = await uploadImage(content, fileName, mimeType);

      if (!imageUri) {
        return;
      }

      // schema: https://developers.metaplex.com/token-metadata/token-standard#the-non-fungible-standard
      const metadata: NftMetadata = {
        name: "Dujo Perdić",
        description:
          "I'm a web2 and web3 developer based in Croatia. Connect with me and lets work together!",
        image: imageUri,
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
              uri: imageUri,
              type: "image/jpeg",
            },
          ],
          category: "image",
        },
      };

      const metadataUri = await umi.uploader.uploadJson(metadata);

      try {
        const tx = await createNft(umi, {
          mint: collectionMint,
          name: collectionName,
          isMutable: true,
          symbol: collectionSymbol,
          uri: metadataUri,
          sellerFeeBasisPoints: percentAmount(100),
          isCollection: true,
        }).sendAndConfirm(umi, {
          confirm: {
            commitment: "confirmed",
          },
          send: {
            commitment: "confirmed",
            maxRetries: 3,
          },
        });

        toast.success(
          `Transaction hash: ${base58.deserialize(tx.signature)[0]}}`,
        );

        setCollectionAddress(collectionMint.publicKey);
      } catch (_error) {
        toast.error("An error occured when creating collection");
      }

      setTransactionInProgress(false);
    },
    [setCollectionAddress, setTransactionInProgress, umi, uploadImage],
  );

  const mintToCollection = useCallback(
    async (_metadata: any) => {
      setTransactionInProgress(true);

      if (!umi) {
        toast.error("Umi not initialized");
        setTransactionInProgress(false);

        return;
      }

      if (!merkleTreeAddress || !collectionAddress) {
        setTransactionInProgress(false);
        return;
      }

      await mintToCollectionV1(umi, {
        leafOwner: umi.identity.publicKey,
        merkleTree: merkleTreeAddress,
        collectionMint: collectionAddress,
        metadata: {
          name: "Dujo Perdić",
          uri: "https://example.com/my-cnft.json",
          sellerFeeBasisPoints: 10000,
          isMutable: true,
          symbol: "DPERDIC",
          collection: { key: collectionAddress, verified: true },
          creators: [
            { address: umi.identity.publicKey, verified: true, share: 100 },
          ],
        },
      }).sendAndConfirm(umi, {
        confirm: {
          commitment: "confirmed",
        },
        send: {
          commitment: "confirmed",
          maxRetries: 3,
        },
      });

      setTransactionInProgress(false);
    },
    [collectionAddress, merkleTreeAddress, setTransactionInProgress, umi],
  );

  return useMemo(
    () => ({
      createMerkleTree,
      fetchTree,
      fetchTreeConfig,
      createCollection,
      mintToCollection,
      uploadImage,
      uploadMetadata,
    }),
    [
      createMerkleTree,
      fetchTree,
      fetchTreeConfig,
      createCollection,
      mintToCollection,
      uploadImage,
      uploadMetadata,
    ],
  );
}
