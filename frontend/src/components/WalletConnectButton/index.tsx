import useWalletStore from "@/stores/walletStore";
import { minifyAddress } from "@/utils";

// TODO:認証済みの場合に自動で接続するように修正する
export const WalletConnectButton = () => {
  const { signer, address, isLoading, connectWallet } = useWalletStore();

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
