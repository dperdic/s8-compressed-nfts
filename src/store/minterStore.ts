import { MerkleTree, TreeConfig } from "@metaplex-foundation/mpl-bubblegum";
import { PublicKey } from "@metaplex-foundation/umi";
import { create } from "zustand";

interface MerkleTreeAddressStore {
  merkleTreeAddress: PublicKey | null;
  setMerkleTreeAddress: (newAddress: PublicKey | null) => void;
}

interface CollectionAddressStore {
  collectionAddress: PublicKey | null;
  setCollectionAddress: (newAddress: PublicKey | null) => void;
}

interface MerkleTreeStore {
  merkleTree: MerkleTree | null;
  setMekleTree: (newTree: MerkleTree | null) => void;
}

interface MerkleTreeConfigStore {
  treeConfig: TreeConfig | null;
  setTreeConfig: (newConfig: TreeConfig | null) => void;
}

interface TransactionStateStore {
  transactionInProgress: boolean;
  setTransactionInProgress: (inProgress: boolean) => void;
}

interface FileUrlStore {
  url: string | null;
  setUrl: (newUrl: string | null) => void;
}

export const useMerkleTreeAddressStore = create<MerkleTreeAddressStore>(
  (set) => ({
    merkleTreeAddress: null,
    setMerkleTreeAddress: (newAddress) =>
      set(() => ({ merkleTreeAddress: newAddress })),
  }),
);

export const useCollectionAddressStore = create<CollectionAddressStore>(
  (set) => ({
    collectionAddress: null,
    setCollectionAddress: (newAddress) =>
      set(() => ({ collectionAddress: newAddress })),
  }),
);

export const useMerkleTreeStore = create<MerkleTreeStore>((set) => ({
  merkleTree: null,
  setMekleTree: (newTree) => set(() => ({ merkleTree: newTree })),
}));

export const useMerkleTreeConfigStore = create<MerkleTreeConfigStore>(
  (set) => ({
    treeConfig: null,
    setTreeConfig: (newConfig) => set(() => ({ treeConfig: newConfig })),
  }),
);

export const useTransactionStateStore = create<TransactionStateStore>(
  (set) => ({
    transactionInProgress: false,
    setTransactionInProgress: (inProgress) =>
      set(() => ({ transactionInProgress: inProgress })),
  }),
);

export const useCollectionImageUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));

export const useCollectionMetadataUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));

export const useNftImageUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));

export const useNftMetadataUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));
