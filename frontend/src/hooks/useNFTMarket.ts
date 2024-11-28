import { NFT_MARKET_ADDRESS } from "@/contracts/config";
import useWalletStore from "@/stores/walletStore";
import NFT_MARKET from "../contracts/NFTMarket#NFTMarket.json";
import { Contract } from "ethers";
import { CreationValues } from "@/app/create/_components/CreationForm";
import { uploadNFTStorageApi } from "@/apis/nft-storage";
import { createNFTApi } from "@/apis/nft";

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

      const { json_path, image_path } = await uploadNFTStorageApi(data);

      const transaction = await nftMarket.createNFT(json_path);

      const result = await transaction.wait();

      await createNFTApi({
        tokenId: result.blockNumber,
        name: values.name,
        description: values.description,
        imageUri: json_path,
        metadataUri: image_path,
        userAddress: signer.address,
      });
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
