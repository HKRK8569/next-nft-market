import useWalletStore from "@/stores/walletStore";
import { useEffect } from "react";

export const WalletConnectButton = () => {
  const { signer, address, isLoading, connectWallet } = useWalletStore();

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);
  const minifyAddress = (address: string) => {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  if (signer && address)
    return <p className="flexh-10">{`👛${minifyAddress(address)}`}</p>;
  return (
    <button
      onClick={connectWallet}
      className="flex h-10 w-40 items-center justify-center rounded-full bg-black px-4 text-white"
    >
      {isLoading ? "接続中" : "ウォレット接続"}
    </button>
  );
};
