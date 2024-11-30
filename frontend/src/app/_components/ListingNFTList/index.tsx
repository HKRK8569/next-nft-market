"use client";

import { getListingNFTsFetcher } from "@/apis/list";
import useSWR from "swr";
import ListNFTCard from "../ListNFTCard";

const ListingNFTList = () => {
  const { data: lists } = useSWR("/api/list", getListingNFTsFetcher);

  return (
    <div className="grid grid-cols-2 gap-4 p-8 md:grid-cols-3">
      {lists?.map((list) => {
        return <ListNFTCard list={list} key={list.id} />;
      })}
    </div>
  );
};

export default ListingNFTList;
