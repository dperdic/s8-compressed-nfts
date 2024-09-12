# S7 - Solana Mobile

Eight assignment for the Solana Summer Fellowship 2024.

## Description

### Assignment

```
Create a cNFT collection of your own profile picture and social links as metadata and airdrop it to other fellows.
```

### Building the app

Create a `.env` file based on the template provided.

To build the app use [bun](https://bun.sh/) and install the depencencies.

```bash
bun i
```

After installing the dependencies run the dev server.

```bash
bun dev
```

### Instructions

This app allows you to create any new compressed NFT collection of your choice.

1. Connect your wallet

   1.1. Airdrop some SOL if you require it (devnet only)

2. Create a Merkle tree or set an address of an existing Merkle tree

   2.1. Use the provided calculator to calculate the merkle tree parameters

3. Create a Collection NFT or set an existing Collection address

   3.1. Upload an image to arweave using the image uploader and set the mimeType or set an existing image url and mimeType for the collection NFT

   3.2. Upload the metadata file using the Metadata uploader or set an existing metadata url for the collection NFT

   3.3. Set the name (required) and symbol (optional) of the collection to create it.

4. Mint cNFTs to addresses

   4.1. Upload an image to arweave using the image uploader and set the mimeType or set an existing image url and mimeType for the cNFT

   4.2. Upload the metadata file using the Metadata uploader or set an existing metadata url for the cNFT

   4.3. Make sure that your Merkle tree, and collection NFT addresses are set before minting

   4.4. Set the name, symbol and a list of comma separated addresses

   4.5. Mint cNFTs to the addresses
