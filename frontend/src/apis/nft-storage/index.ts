type UploadNFTStorageApiResponse = {
  jsonIpfsHash: string;
  imageIpfsHash: string;
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
