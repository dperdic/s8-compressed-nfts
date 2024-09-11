import { MerkleTree, TreeConfig } from "@metaplex-foundation/mpl-bubblegum";
import { PublicKey } from "@metaplex-foundation/umi";
import { create } from "zustand";

interface AddressStore {
  address: PublicKey | null;
  setAddress: (newAddress: PublicKey | null) => void;
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

interface ImageStore extends FileUrlStore {
  mimeType: string | null;
  setMimeType: (newMimeType: string | null) => void;
}

export const useMerkleTreeAddressStore = create<AddressStore>((set) => ({
  address: null,
  setAddress: (newAddress) => set(() => ({ address: newAddress })),
}));

export const useCollectionAddressStore = create<AddressStore>((set) => ({
  address: null,
  setAddress: (newAddress) => set(() => ({ address: newAddress })),
}));

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

export const useCollectionImageUrlStore = create<ImageStore>((set) => ({
  url: null,
  mimeType: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
  setMimeType: (newMimeType) => set(() => ({ mimeType: newMimeType })),
}));

export const useCollectionMetadataUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));

export const useNftImageUrlStore = create<ImageStore>((set) => ({
  url: null,
  mimeType: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
  setMimeType: (newMimeType) => set(() => ({ mimeType: newMimeType })),
}));

export const useNftMetadataUrlStore = create<FileUrlStore>((set) => ({
  url: null,
  setUrl: (newUrl) => set(() => ({ url: newUrl })),
}));
