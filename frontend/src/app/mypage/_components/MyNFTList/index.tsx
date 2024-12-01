"use client";

import { getUserAddressNFTsFetcher } from "@/apis/nft";
import useSWR from "swr";
import MyNFTCard from "../MyNFTCard";
import MyListingNFTCard from "../MyListingNFTCard";
import { getListingNFTsFetcher } from "@/apis/list";

type Props = {
  address: string;
};
const MyNFTList = ({ address }: Props) => {
  const { data: nfts } = useSWR(
    `/api/nfts?userAddress=${address}`,
    getUserAddressNFTsFetcher,
  );
  const { data: listingNfts } = useSWR(
    `/api/list?userAddress=${address}`,
    getListingNFTsFetcher,
  );

  return (
    <div className="p-8">
      <h2 className="mb-4 text-3xl">所有NFT</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {nfts?.map((nft) => {
          return <MyNFTCard key={nft.id} nft={nft} />;
        })}
      </div>
      <h2 className="mb-4 text-3xl">出品中</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {listingNfts?.map((listingNFT) => {
          return (
            <MyListingNFTCard key={listingNFT.id} listingNFT={listingNFT} />
          );
        })}
      </div>
    </div>
  );
};

export default MyNFTList;
