import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

export default function Header() {
  const [balance, setBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      { commitment: "confirmed" },
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [connection, publicKey]);

  return (
    <header className="fixed top-0 z-10 flex h-18 w-full border-b bg-white shadow-sm">
      <nav className="flex h-full w-full items-center justify-between px-8 sm:px-16">
        <img src="/vite.svg" className="h-10" />

        <div className="flex gap-4">
          <span className="my-auto">Balance: {balance} SOL</span>
          <WalletMultiButton className="my-auto" />
        </div>
      </nav>
    </header>
  );
}
