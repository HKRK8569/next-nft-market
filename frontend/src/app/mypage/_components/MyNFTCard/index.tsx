import { Input } from "@/components/Input";
import useNFTMarket from "@/hooks/useNFTMarket";
import { showErrorPopUp, showSuccessPopUp } from "@/utils";
import { Nft } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  nft: Nft;
};

const MyNFTCard = ({ nft }: Props) => {
  const { listNFT } = useNFTMarket();
  const [value, setValue] = useState(0.000001);
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const listNFTAction = async () => {
    try {
      await listNFT({
        tokenId: nft.tokenId,
        nftId: nft.id,
        price: value,
      });
      showSuccessPopUp("出品しました。");
    } catch (e) {
      console.log(e);
      showErrorPopUp("出品に失敗しました");
    }
    closeModal();
  };
  return (
    <>
      <div>
        <div>
          <Image width={500} height={500} src={nft.image} alt={nft.name} />
        </div>
        <button
          onClick={openModal}
          className="h-10 w-full bg-black text-center text-white hover:opacity-50"
        >
          出品
        </button>
      </div>
      {isOpen && (
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        <div className="fixed left-0 top-0 size-full bg-black bg-opacity-50">
          <div className="relative left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded bg-white">
            <div className="flex justify-between border-b border-black p-2">
              <p>NFT出品</p>
              <button onClick={closeModal}>X</button>
            </div>
            <div className="p-2">
              <Input
                name="price"
                value={value}
                onChange={(e) => {
                  setValue(Number(e.target.value));
                }}
                className="mb-2 w-full"
                placeholder="ETH"
                type="number"
                step={0.000001}
                min={0.000001}
              />
            </div>
            <form
              action={listNFTAction}
              className="flex justify-end border-t border-black p-2"
            >
              <button
                type="submit"
                className="rounded bg-black p-2 px-4 text-white"
              >
                出品
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyNFTCard;
