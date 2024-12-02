type UploadNFTStorageApiResponse = {
  json_path: string;
  image_path: string;
};

export const uploadNFTStorageApi = async (
  body: FormData
): Promise<UploadNFTStorageApiResponse> => {
  const response = await fetch("/api/nft-storage", {
    method: "POST",
    body,
  });
  const json = await response.json();

  return json;
};
