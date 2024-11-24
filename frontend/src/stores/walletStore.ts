import { ethers } from "ethers";
import { create } from "zustand";

type Store = {
  signer: ethers.JsonRpcSigner | null;
  address: string | null;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
};

const useWalletStore = create<Store>((set) => ({
  signer: null,
  address: null,
  isLoading: false,
  connectWallet: async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as unknown as {
      ethereum: ethers.Eip1193Provider;
    };
    if (ethereum == null) {
      window.open("https://metamask.io/ja/download/", "_blank");
    } else {
      set({
        isLoading: true,
      });
      try {
        const provider = new ethers.BrowserProvider(ethereum);

        const signer = await provider.getSigner();

        set({
          signer,
          address: signer.address,
        });
      } catch (e) {
        console.log(e);
      }
      set({
        isLoading: false,
      });
    }
  },
}));

export default useWalletStore;
