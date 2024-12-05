import { GetCIDResponse } from "pinata-web3";
import { Fetcher } from "swr";

type UploadNFTStorageApiResponse = {
  jsonIpfsHash: string;
  imageIpfsHash: string;
};

export const getNFTFileFetcher: Fetcher<GetCIDResponse, string> = async (url) =>
  fetch(url).then((res) => res.json());

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
