import { useWallet } from "@solana/wallet-adapter-react";
import { Slide, ToastContainer } from "react-toastify";
import Airdrop from "./Airdrop";
import MerkleTree from "./MerkleTree";

import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const { publicKey } = useWallet();

  return (
    <main className="mt-18 flex h-full w-full flex-grow items-center justify-center px-8 py-8 sm:px-16">
      {publicKey ? (
        <div className="mx-auto grid w-full max-w-7xl gap-12">
          <Airdrop />
          <MerkleTree />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl">
          <div className="w-full rounded-md bg-white p-8 text-center shadow">
            <h3 className="text-xl font-semibold">
              Connect a wallet to continue
            </h3>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={true}
        theme="light"
        transition={Slide}
      />
    </main>
  );
}
