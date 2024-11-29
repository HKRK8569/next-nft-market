"use client";

import { getUserAddressNFTsFetcher } from "@/apis/nft";
import useSWR from "swr";
import MyNFTCard from "../MyNFTCard";

type Props = {
  address: string;
};
const MyNFTList = ({ address }: Props) => {
  const { data: nfts } = useSWR(
    `/api/nfts?userAddress=${address}`,
    getUserAddressNFTsFetcher,
  );

  return (
    <div className="grid grid-cols-2 gap-4 p-8 md:grid-cols-3">
      {nfts?.map((nft) => {
        return <MyNFTCard key={nft.id} nft={nft} />;
      })}
    </div>
  );
};

export default MyNFTList;
