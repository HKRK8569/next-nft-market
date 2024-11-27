import { NFT_MARKET_ADDRESS } from "@/contracts/config";
import useWalletStore from "@/stores/walletStore";
import NFT_MARKET from "../contracts/NFTMarket#NFTMarket.json";
import { Contract } from "ethers";
import { CreationValues } from "@/app/create/_components/CreationForm";

const useNFTMarket = () => {
  const { signer } = useWalletStore();

  const createNFT = async (values: CreationValues) => {
    try {
      if (!signer) return;
      const nftMarket = new Contract(
        NFT_MARKET_ADDRESS,
        NFT_MARKET.abi,
        signer
      );
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image);

      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });

      const json = await response.json();

      const transaction = await nftMarket.createNFT(json.json_path);

      await transaction.wait();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const listNFT = async () => {};

  return {
    createNFT,
    listNFT,
  };
};

export default useNFTMarket;
