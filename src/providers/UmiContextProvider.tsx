import { ReactNode, useEffect, useState } from "react";
import type { Umi } from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { UmiContext } from "./UmiContext";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

export default function UmiContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [umi, setUmi] = useState<Umi | null>(null);

  useEffect(() => {
    let umi: Umi | null = null;

    if (wallet.connected && wallet.publicKey) {
      umi = createUmi(connection.rpcEndpoint)
        .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata())
        .use(
          irysUploader({
            // mainnet address: "https://node1.irys.xyz"
            // devnet address: "https://devnet.irys.xyz"
            address: connection.rpcEndpoint.includes("mainnet")
              ? "https://node1.irys.xyz"
              : "https://devnet.irys.xyz",
          }),
        );
    }

    setUmi(umi);
  }, [connection.rpcEndpoint, wallet]);

  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
}
