import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  return (
    <header className="h-18 fixed top-0 z-10 flex w-full bg-white shadow-sm">
      <nav className="flex h-full w-full items-center justify-between gap-4 px-8 sm:px-16">
        <img src="/vite.svg" className="h-10" />

        <WalletMultiButton />
      </nav>
    </header>
  );
}
