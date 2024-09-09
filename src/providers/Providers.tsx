import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletContextProvider from "./WalletContextProvider";
import UmiProvider from "./UmiContextProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletContextProvider>
      <UmiProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </UmiProvider>
    </WalletContextProvider>
  );
}
