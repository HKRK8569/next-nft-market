"use client";

import useWalletStore from "@/stores/walletStore";
import MyNFTList from "./_components/MyNFTList";

export default function Mypage() {
  const { signer } = useWalletStore();

  if (!signer) {
    return (
      <div className="flex size-full items-center justify-center">
        <p>ウォレットと接続してください</p>
      </div>
    );
  }

  return <MyNFTList address={signer.address} />;
}
