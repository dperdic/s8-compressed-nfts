export default function Footer() {
  return (
    <footer className="flex h-18 w-full items-center bg-black px-8 text-white sm:px-16">
      <div className="flex h-full w-full flex-grow py-4">
        <a
          href="https://github.com/dperdic/s8-compressed-nfts"
          target="_blank"
          className="flex flex-row gap-2"
        >
          <img
            src="/github-mark-white.svg"
            alt="vite"
            className="inline-block h-5"
          />

          <span>Source code</span>
        </a>
      </div>
    </footer>
  );
}
