"use client";

import Link from "next/link";
import { WalletConnectButton } from "../WalletConnectButton";
import PAGES from "@/constants/pages";

const Header = () => {
  return (
    <header className="flex h-16 justify-between items-center w-full border-b border-gray-300 px-4">
      <div className="flex items-center">
        <p className="mr-8">MarketPlace</p>
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
