import { Nft } from "@prisma/client";

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
