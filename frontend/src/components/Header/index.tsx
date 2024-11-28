"use client";

import Link from "next/link";
import { WalletConnectButton } from "../WalletConnectButton";
import PAGES from "@/constants/pages";

const Header = () => {
  return (
    <header className="sticky bg-white z-50 top-0 flex py-2 justify-between items-center w-full border-b border-gray-300 px-4">
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
