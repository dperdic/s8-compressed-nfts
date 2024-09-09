import { Umi } from "@metaplex-foundation/umi";
import { useContext } from "react";
import { UmiContext } from "../providers/UmiContext";

export default function useUmi(): Umi {
  const umi = useContext(UmiContext).umi;

  if (!umi) {
    throw new Error(
      "Umi context was not initialized. " +
        "Did you forget to wrap your app with <UmiProvider />?",
    );
  }

  return umi;
}
