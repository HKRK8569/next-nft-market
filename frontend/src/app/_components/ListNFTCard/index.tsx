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
          <Image
            width={1000}
            height={1000}
            src={list.nft.image}
            alt={list.nft.name}
          />
        </div>
        <button className="h-10 w-full bg-black text-center text-white hover:opacity-50">
          {list.price}ETH 購入
        </button>
      </div>
    </>
  );
};

export default ListNFTCard;
