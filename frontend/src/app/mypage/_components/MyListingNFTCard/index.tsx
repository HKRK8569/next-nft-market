import { ListingNft } from "@/apis/list";
import useNFTMarket from "@/hooks/useNFTMarket";
import Image from "next/image";

type Props = {
  listingNFT: ListingNft;
};

const MyListingNFTCard = ({ listingNFT }: Props) => {
  const { cancelListing } = useNFTMarket();
  return (
    <>
      <div>
        <div>
          <Image
            width={1000}
            height={1000}
            src={listingNFT.nft.image}
            alt={listingNFT.nft.name}
          />
        </div>
        <button
          onClick={() => {
            cancelListing({
              listId: listingNFT.id,
              tokenId: listingNFT.nft.tokenId,
            });
          }}
          className="h-10 w-full bg-black text-center text-white hover:opacity-50"
        >
          出品取り消し
        </button>
      </div>
    </>
  );
};

export default MyListingNFTCard;
