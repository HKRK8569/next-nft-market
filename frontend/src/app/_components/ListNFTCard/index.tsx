import { ListingNft } from "@/apis/list";
import Image from "next/image";

type Props = {
  list: ListingNft;
};
const ListNFTCard = ({ list }: Props) => {
  return (
    <>
      <div>
        <div>
          <div className="aspect-square w-full">
            <Image
              width={1000}
              height={1000}
              src={`https://gateway.pinata.cloud/ipfs/${list.nft.image}`}
              alt={list.nft.name}
            />
          </div>
        </div>
        <button className="h-10 w-full bg-black text-center text-white hover:opacity-50">
          {`${list.price} ETH 購入`}
        </button>
      </div>
    </>
  );
};

export default ListNFTCard;
