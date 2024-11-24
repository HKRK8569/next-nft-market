"use client";

import { WalletConnectButton } from "../WalletConnectButton";

const Header = () => {
  return (
    <header className="flex h-16 justify-between items-center w-full border-b border-gray-300 px-4">
      <p>MarketPlace</p>
      <div></div>
      <WalletConnectButton />
    </header>
  );
};

export default Header;
