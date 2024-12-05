import { GetCIDResponse } from "pinata-web3";

type UploadNFTStorageApiResponse = {
  jsonIpfsHash: string;
  imageIpfsHash: string;
};

export const getNFTFile = async (ipfsHash: string): Promise<GetCIDResponse> => {
  const response = await fetch(`/api/nft-storage?ipfsHash=${ipfsHash}`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
};

export const uploadNFTStorageApi = async (
  body: FormData,
): Promise<UploadNFTStorageApiResponse> => {
  const response = await fetch("/api/nft-storage", {
    method: "POST",
    body,
  });
  const json = await response.json();

  return json;
};
