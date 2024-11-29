import { List } from "@prisma/client";

export type ListingApiBody = {
  nftId: number;
  price: number;
};

export const listingApi = async (body: ListingApiBody): Promise<List> => {
  const response = await fetch("/api/list", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json: List = await response.json();
  return json;
};
