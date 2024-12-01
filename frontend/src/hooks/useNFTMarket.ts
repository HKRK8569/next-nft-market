import { NFT_MARKET_ADDRESS } from "@/contracts/config";
import useWalletStore from "@/stores/walletStore";
import NFT_MARKET from "../contracts/NFTMarket#NFTMarket.json";
import { Contract, ethers } from "ethers";
import { CreationValues } from "@/app/create/_components/CreationForm";
import { uploadNFTStorageApi } from "@/apis/nft-storage";
import { createNFTApi } from "@/apis/nft";
import { useSWRConfig } from "swr";
import { cancelListingApi, listingApi } from "@/apis/list";
import { LogDescription } from "ethers";

const useNFTMarket = () => {
  const { signer } = useWalletStore();
  const { mutate } = useSWRConfig();
  const createNFT = async (values: CreationValues) => {
    try {
      if (!signer) return;
      const nftMarket = new Contract(
        NFT_MARKET_ADDRESS,
        NFT_MARKET.abi,
        signer,
      );
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image);

      const { json_path, image_path } = await uploadNFTStorageApi(data);

      const transaction = await nftMarket.createNFT(json_path);

      const result = await transaction.wait();

      const event = nftMarket.interface.parseLog(
        result.logs[2],
      ) as LogDescription;
      const tokenId = Number(event.args[0].toString());
      await createNFTApi({
        tokenId: tokenId,
        name: values.name,
        description: values.description,
        imageUri: image_path,
        metadataUri: json_path,
        userAddress: signer.address,
      });
      mutate(`/api/nfts?userAddress=${signer.address}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const listNFT = async ({
    tokenId,
    nftId,
    price,
  }: {
    tokenId: number;
    nftId: number;
    price: number;
  }) => {
    if (!signer) return;
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);
    try {
      const transaction = await nftMarket.listNFT(
        tokenId,
        ethers.parseEther(String(price)),
      );
      await transaction.wait();
      await listingApi({
        nftId,
        price,
      });
      mutate(`/api/nfts?userAddress=${signer.address}`);
      mutate(`/api/list`);
      mutate(`/api/list?userAddress=${signer.address}`);
    } catch (err) {
      throw err;
    }
  };

  const cancelListing = async ({
    tokenId,
    listId,
  }: {
    tokenId: number;
    listId: number;
  }) => {
    if (!signer) return;
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);
    try {
      const transaction = await nftMarket.cancelListing(tokenId);
      await transaction.wait();
      await cancelListingApi(listId);

      mutate(`/api/nfts?userAddress=${signer.address}`);
      mutate(`/api/list`);
      mutate(`/api/list?userAddress=${signer.address}`);
    } catch (err) {
      throw err;
    }
  };

  return {
    createNFT,
    listNFT,
    cancelListing,
  };
};

export default useNFTMarket;
