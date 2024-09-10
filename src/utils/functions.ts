import {
  Connection,
  RpcResponseAndContext,
  SignatureResult,
} from "@solana/web3.js";

export const confirmTransaction = async (
  connection: Connection,
  tx: string,
): Promise<RpcResponseAndContext<SignatureResult>> => {
  const bh = await connection.getLatestBlockhash();

  return await connection.confirmTransaction(
    {
      signature: tx,
      blockhash: bh.blockhash,
      lastValidBlockHeight: bh.lastValidBlockHeight,
    },
    "confirmed",
  );
};

export const getStep = (decimals: number): number => {
  const result = Math.pow(10, -1 * decimals);

  return Math.round(result * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
