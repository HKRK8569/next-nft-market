import { Nft } from "@prisma/client";
import { Fetcher } from "swr";

export type CreateNFTApiBody = {
  tokenId: number;
  name: string;
  description: string;
  userAddress: string;
  metadataUri: string;
  imageUri: string;
};

export const createNFTApi = async (body: CreateNFTApiBody): Promise<Nft> => {
  const response = await fetch("/api/nfts", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json: Nft = await response.json();
  return json;
};

export const getUserAddressNFTsFetcher: Fetcher<Nft[], string> = async (url) =>
  fetch(url).then((res) => res.json());
