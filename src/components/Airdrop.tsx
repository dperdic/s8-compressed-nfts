import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useTransactionStateStore } from "../store/minterStore";
import { confirmTransaction, getStep } from "../utils/functions";

export default function Airdrop() {
  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress,
  );
  const setTransactionInProgress = useTransactionStateStore(
    (state) => state.setTransactionInProgress,
  );

  const [airdropAmount, setAirdropAmount] = useState("");
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const requestAirdrop = async () => {
    setTransactionInProgress(true);

    if (!publicKey || !connection) {
      toast.error("Wallet not connected");
      setTransactionInProgress(false);

      return;
    }

    let amount: number;

    try {
      amount = Number(airdropAmount);
    } catch (error) {
      console.error(error);
      toast.error("Invalid airdrop amount");
      setTransactionInProgress(false);

      return;
    }

    try {
      const tx = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL,
      );

      const confirmation = await confirmTransaction(connection, tx);

      if (confirmation.value.err) {
        toast.error(confirmation.value.err.toString());
      } else {
        toast.info(`Transaction hash: ${tx}`);
      }
    } catch (error) {
      toast.error(error as string);
    }

    setAirdropAmount("");
    setTransactionInProgress(false);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h3 className="pb-4 text-xl font-semibold">Airdrop</h3>

      <div className="grid w-full gap-4 rounded-md bg-white p-4 shadow">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="number"
            placeholder="Amount"
            step={getStep(9)}
            min={0}
            value={airdropAmount}
            onChange={(event) => {
              setAirdropAmount(event.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-gray-800 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />

          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={transactionInProgress || !airdropAmount}
            onClick={requestAirdrop}
          >
            Airdrop
          </button>
        </div>
      </div>
    </div>
  );
}
