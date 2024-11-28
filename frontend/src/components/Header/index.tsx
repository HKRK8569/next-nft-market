"use client";

import Link from "next/link";
import { WalletConnectButton } from "../WalletConnectButton";
import PAGES from "@/constants/pages";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2">
      <div className="flex items-center">
        <Link href={PAGES.TOP} className="mr-8">
          MarketPlace
        </Link>
        <div className="flex justify-center">
          <Link href={PAGES.CREATE}>NFT作成</Link>
        </div>
      </div>

      <div className="text-right">
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Header;
