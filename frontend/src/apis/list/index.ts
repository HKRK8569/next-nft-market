import { List, Nft } from "@prisma/client";
import { Fetcher } from "swr";

export type ListingApiBody = {
  nftId: number;
  price: number;
};

export interface ListingNft extends List {
  nft: Nft;
}

export const getListingNFTsFetcher: Fetcher<ListingNft[], string> = async (
  url,
) => fetch(url).then((res) => res.json());

export const getListApi = async (): Promise<List> => {
  const response = await fetch("/api/list", {
    method: "GET",
  });
  const json: List = await response.json();
  return json;
};

export const listingApi = async (body: ListingApiBody): Promise<List> => {
  const response = await fetch("/api/list", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json: List = await response.json();
  return json;
};
